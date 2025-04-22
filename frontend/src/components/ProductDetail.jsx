import React, { useState, useEffect } from 'react';
import Layout from "./layout/Layout";
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiTruck,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCartContext } from '../context/CartContext';

export default function ProductDetail() {
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [expandedDetails, setExpandedDetails] = useState(false);
  const {isCart,setIsCart}=useCartContext();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/single-product/${params.slug}`
      );
      if (data?.success) {
        setProduct(data?.product);
        getSimilarProducts(data?.product._id, data?.product.catagory?._id);
      }
    } catch (error) {
      showError("Error while fetching product details");
    } finally {
      setLoading(false);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      if (data.success) {
        setRelatedProducts(data.products);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const showSuccess = (message) => {
    enqueueSnackbar(message, {
      variant: "success",
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right"
      }
    });
  };

  const showError = (message) => {
    enqueueSnackbar(message, {
      variant: "error",
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right"
      }
    });
  };


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


  const handleWishlist = () => {
    showSuccess(`${product.name} added to wishlist`);
  };

  // const incrementQuantity = () => {
  //   if (quantity < (product?.quantity || 10)) {
  //     setQuantity(quantity + 1);
  //   }
  // };

  // const decrementQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  const toggleDetails = () => {
    setExpandedDetails(!expandedDetails);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </Layout>
    );
  }

  // Generate image array (primary image + additional images if available)
  const productImages = [
    `${import.meta.env.VITE_APP_API}/api/v1/product/product-photo/${product._id}`,
    ...(product.images || []).map(img => `${import.meta.env.VITE_APP_API}/api/v1/product/product-photo/${product._id}/${img}`)
  ].filter(Boolean);

  return (
    <Layout>
      <div className="bg-white">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer text-gray-600 hover:text-orange-500 transition-colors text-sm font-medium"
          >
            <FiArrowLeft className="mr-2" />
            Back to products
          </button>
        </div>

        {/* Product Section */}
        <div className="container mx-auto px-4 sm:px-6 pb-12">
          <div className="lg:flex lg:space-x-8 xl:space-x-12">
            {/* Product Images */}
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="flex flex-col md:flex-row-reverse gap-4">
                {/* Main Image */}
                <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-8 aspect-square">
                  <motion.img
                    key={activeImageIndex}
                    src={productImages[activeImageIndex]}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image';
                    }}
                  />
                </div>
                
                {/* Thumbnails (if multiple images) */}
                {productImages.length > 1 && (
                  <div className="md:w-20 flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-16 h-16 md:w-full flex-shrink-0 rounded border overflow-hidden ${activeImageIndex === index ? 'border-orange-500' : 'border-gray-200'}`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100x100?text=Thumbnail';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <div className="max-w-lg mx-auto">
                {/* Category */}
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                  {product.catagory?.name || 'Category'}
                </p>
                
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center mb-5">
                  <div className="flex items-center mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar
                        key={star}
                        className={`w-4 h-4 ${star <= (product.rating || 4) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.reviews?.length || 0} reviews
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {product.oldPrice && (
                    <span className="text-base text-gray-500 line-through mr-2">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="ml-2 text-sm font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                      Save {Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.quantity > 0 ? (
                    <span className="text-green-600 flex items-center text-sm">
                      <FiCheckCircle className="mr-1.5" /> In stock ({product.quantity} available)
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center text-sm">
                      <FiCheckCircle className="mr-1.5" /> Out of stock
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <div className="mb-6">
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Quantity and Actions */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      {/* <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3> */}
                      <div className="flex items-center">
                        {/* <button
                          onClick={decrementQuantity}
                          className="w-10 h-10 border border-gray-300 rounded-l flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={quantity <= 1}
                        >
                          <FiChevronDown className="text-gray-600" />
                        </button> */}
                        {/* <div className="w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center font-medium">
                          {quantity}
                        </div> */}
                        {/* <button
                          onClick={incrementQuantity}
                          className="w-10 h-10 border border-gray-300 rounded-r flex items-center justify-center hover:bg-gray-50 transition-colors"
                          disabled={quantity >= (product.quantity || 10)}
                        >
                          <FiChevronUp className="text-gray-600" />
                        </button> */}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddToCart(product)}
                      disabled={product.quantity <= 0}
                      className={`flex-1 py-3 px-6 rounded-md cursor-pointer font-medium flex items-center justify-center ${
                        product.quantity <= 0 
                          ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                          : 'bg-orange-500 text-white hover:bg-orange-600 transition-colors'
                      }`}
                    >
                      <FiShoppingCart className="mr-2" />
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleWishlist}
                      className="w-12 h-12 flex items-center cursor-pointer justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <FiHeart className="text-gray-600" />
                    </motion.button>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <FiTruck className="text-gray-500 mr-2" />
                      <span>Free shipping</span>
                    </div>
                    <div className="flex items-center">
                      <FiShield className="text-gray-500 mr-2" />
                      <span>2-year warranty</span>
                    </div>
                  </div>
                </div>

                {/* Expandable Product Details */}
                <div className="border-t border-gray-200 pt-6">
                  <button
                    onClick={toggleDetails}
                    className="flex items-center cursor-pointer justify-between w-full text-left mb-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
                    {expandedDetails ? (
                      <FiChevronUp className="text-gray-500" />
                    ) : (
                      <FiChevronDown className="text-gray-500" />
                    )}
                  </button>
                  
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedDetails ? 'auto' : 0,
                      opacity: expandedDetails ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 text-sm text-gray-600 pb-4">
                      <div className="flex">
                        <span className="w-32 font-medium text-gray-900">Category</span>
                        <span>{product.catagory?.name || '-'}</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 font-medium text-gray-900">SKU</span>
                        <span>{product.slug || '-'}</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 font-medium text-gray-900">Weight</span>
                        <span>{product.weight || 'some weight'}</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 font-medium text-gray-900">Dimensions</span>
                        <span>{product.dimensions || "some dimensions"}</span>
                      </div>
                      <div>
                        <p className="text-gray-600 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="bg-gray-50 py-12 border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">You May Also Like</h2>
              {/* {product.catagory?.slug && (
                <Link 
                  to={`/category/${product.catagory.slug}`} 
                  className="flex items-center text-orange-500 hover:text-orange-600 transition-colors text-sm font-medium"
                >
                  View all <FiArrowRight className="ml-1" />
                </Link>
              )} */}
            </div>

            {relatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.slice(0, 4).map((related) => (
                  <motion.div 
                    key={related._id} 
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
                  >
                    <div className="relative pt-[100%] bg-gray-50">
                      <Link to={`/product/${related.slug}`}>
                        <img
                          src={`${import.meta.env.VITE_APP_API}/api/v1/product/product-photo/${related._id}`}
                          alt={related.name}
                          className="absolute top-0 left-0 w-full h-full object-contain p-4"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                          }}
                        />
                      </Link>
                      {related.quantity <= 0 && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Sold Out
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <Link to={`/product/${related.slug}`} className="group">
                        <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-orange-500 transition-colors line-clamp-2">
                          {related.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                        {related.catagory?.name}
                      </p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          ${related.price.toFixed(2)}
                        </span>
                        {related.oldPrice && (
                          <span className="text-gray-400 text-xs line-through">
                            ${related.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAddToCart(related)}
                        disabled={related.quantity <= 0}
                        className={`w-full py-2 px-4 bg-[#FF851B] cursor-pointer rounded-md text-sm font-medium ${
                          related.quantity <= 0 
                            ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                            : 'bg-[#FF851B] text-white hover:bg-orange-600 transition-colors'
                        }`}
                      >
                        {related.quantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No similar products found</p>
                <Link 
                  to="/" 
                  className="inline-block cursor-pointer mt-4 text-orange-500 hover:text-orange-600 transition-colors text-sm font-medium"
                >
                  Browse our collection
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}