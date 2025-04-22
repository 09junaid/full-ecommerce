import React, { useState, useEffect } from 'react';
import Layout from '../../../components/layout/Layout';
import axios from "axios";
import { useParams, Link,useNavigate } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight,FiArrowLeft } from 'react-icons/fi';
import { useCartContext } from '../../../context/CartContext';
export default function ByCategories() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate=useNavigate();
  const {isCart,setIsCart}=useCartContext();

  const getProductCategory = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-category/${slug}`
      );
      if (data?.success) {
        setProducts(data.products);
        setCategory(data.category);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductCategory();
  }, [slug]);

  const handleAddToCart=(product)=>{
    setIsCart([...isCart,product]);
    localStorage.setItem('cart',JSON.stringify([...isCart,product]));
    enqueueSnackbar(`${product.name} added to cart`, {
      variant: "success",
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  }


  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="container mx-auto px-4 sm:px-6 py-6">
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center cursor-pointer text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium"
                  >
                    <FiArrowLeft className="mr-2" />
                    Back to products
                  </button>
                </div>
        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {category?.name}
          </h1>
          <div className="w-20 h-0.5 bg-gray-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {category?.description || "Explore our premium collection in this category."}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
              >
                <Link to={`/product/${product.slug}`} className="block">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                    <img
                      src={`${import.meta.env.VITE_APP_API}/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="w-full h-64 object-contain p-4 group-hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x300?text=Product+Image";
                      }}
                    />
                    
                  </div>
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      {product.quantity <= 0 ? (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full cursor-default">
                          Out of Stock
                        </span>
                      ) : (
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full cursor-default">
                          In Stock: {product.quantity}
                        </span>
                      )}
                      {product.oldPrice && (
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full cursor-default">
                          {Math.round(
                            (1 - product.price / product.oldPrice) * 100
                          )}
                          % OFF
                        </span>
                      )}
                    </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-gray-400 text-sm line-through ml-2">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                      <button 
                        className="flex items-center  justify-center w-10 h-10 rounded-full bg-orange-200 hover:bg-orange-500 text-white cursor-pointer transition-colors"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FiShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <FiShoppingBag className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No products found in this category
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any products in this category at the moment.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white  bg-[#FF851B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <FiArrowLeft className="ml-2" /> {" "} Browse Categories 
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}