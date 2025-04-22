import React from 'react';
import Layout from "../components/layout/Layout";
import { useCartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiShoppingBag, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { isCart, setIsCart } = useCartContext();
  const [auth] = useAuth();

  // Calculate totals
  const subtotal = isCart.reduce((sum, item) => sum + (item.price), 0);
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  // const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping;

  const removeItem = (productId) => {
    setIsCart(isCart.filter(item => item._id !== productId));
    localStorage.setItem("cart", JSON.stringify(isCart.filter(item => item._id !== productId)));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FiShoppingBag className="mr-3 text-orange-500" />
            Your Shopping Cart
          </h1>
          {auth?.token && (
            <p className="mt-2 text-gray-600">Hello, {auth.user.name}</p>
          )}
        </div>

        {isCart.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <FiShoppingBag className="w-full h-full" />
            </div>
            <h2 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Start adding some products to your cart</p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            {/* Product list */}
            <div className="lg:col-span-8">
              <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                  {isCart.map((product) => (
                    <li key={product._id} className="p-4 sm:p-6">
                      <div className="flex items-start sm:items-center">
                        {/* Product image */}
                        <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                          <img
                            src={`${import.meta.env.VITE_APP_API}/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>

                        {/* Product details */}
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900">
                                {product.name}
                              </h3>
                              {product.category?.name && (
                                <p className="mt-1 text-sm text-gray-500 capitalize">
                                  {product.category.name}
                                </p>
                              )}
                            </div>
                            <p className="ml-4 text-base font-medium text-gray-900">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between sm:mt-6">
                            {/* Quantity selector */}
                            {/* <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(product._id, product.quantity - 1)}
                                className="p-1 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Decrease quantity</span>
                                -
                              </button>
                              <span className="mx-2 text-sm font-medium text-gray-900">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(product._id, product.quantity + 1)}
                                className="p-1 text-gray-400 hover:text-gray-500"
                              >
                                <span className="sr-only">Increase quantity</span>
                                +
                              </button>
                            </div> */}

                            {/* Remove button */}
                            <button
                              type="button"
                              onClick={() => removeItem(product._id)}
                              className="flex items-center cursor-pointer text-sm font-medium text-orange-500 hover:text-orange-700"
                            >
                              <FiTrash2 className="mr-1 h-4 w-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-8 lg:mt-0 lg:col-span-4">
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">
                      ${subtotal.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Shipping</p>
                    <p className="text-sm font-medium text-gray-900">
                      ${shipping.toFixed(2)}
                    </p>
                  </div>

                  {/* <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Tax</p>
                    <p className="text-sm font-medium text-gray-900">
                      ${tax.toFixed(2)}
                    </p>
                  </div> */}

                  <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-base font-medium text-gray-900">
                      ${total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={auth?.user?"/checkout":"/login"}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    {auth?.user?"Proceed to Checkout":"Login to Checkout"}
                  </Link>
                </div>

                <div className="mt-4 text-center">
                  <Link
                    to="/"
                    className="inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-700"
                  >
                    <FiArrowLeft className="mr-1.5 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}