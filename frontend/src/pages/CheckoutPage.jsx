import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useCartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Layout from "../components/layout/Layout";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const stripe = useStripe();
  const elements = useElements();
  const { isCart, setIsCart } = useCartContext();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = auth?.user || {};

  const subtotal = isCart.reduce((sum, item) => sum + (item.price), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
  
    if (!auth?.user) {
      setError("User not logged in.");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      // 1. Create payment intent  
      const { data: { clientSecret } } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/payment/create-payment`,
        {
          cartItems: isCart,
          userId: auth.user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
  
      // 2. Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: auth.user.name || 'Guest',
            email: auth.user.email || 'guest@example.com',
            address: {
              line1: auth.user.address || 'N/A',
              city: auth.user.city || 'N/A',
              postal_code: auth.user.pincode || '00000',
              country: 'US',
            },
          },
        },
      });
  
      if (stripeError) throw stripeError;
  
      // 3. Create order
      const orderData = {
        products: isCart.map(item => item._id),
        payment: {
          amount: paymentIntent.amount / 100,
          currency: 'usd',
          paymentIntentId: paymentIntent.id,
          status: paymentIntent.status,
        },
        buyerName: auth.user.name, // Changed from name to buyerName
        buyerEmail: auth.user.email, // Changed from email to buyerEmail
      };
  
  
      const { data: order } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/order/my-order`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
  
  
      // 4. Clear cart
      setIsCart([]);
      localStorage.removeItem('cart');
  
      // 5. Redirect to success page
      navigate('/order-success', { state: { order } });
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="mt-2 text-gray-600">Complete your purchase</p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Details</h2>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
                    <div className="border p-3 rounded">
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        value={user.name || ""}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={user.email || ""}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
                    <textarea
                      value={user.address || ""}
                      readOnly
                      className="w-full p-2 border rounded bg-gray-100"
                      rows={3}
                    />
                  </div>
                </div>

                {error && (
                  <div className="mt-4 text-red-500 bg-red-50 p-3 rounded">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!stripe || loading}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-md shadow-sm font-medium focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </button>
              </form>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-8 lg:mt-0 lg:col-span-4">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-4">
                {isCart.map(item => (
                  <div key={item._id} className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${(item.price).toFixed(2)}</p>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium">${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Shipping</p>
                    <p className="text-sm font-medium">${shipping.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2">
                    <p className="text-base font-medium">Total</p>
                    <p className="text-base font-medium">${total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
