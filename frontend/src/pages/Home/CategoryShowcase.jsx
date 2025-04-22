import React, { useState, useEffect } from "react";
import { 
  FiArrowRight, 
  FiShoppingBag, 
  FiHeart, 
  FiEye,
  FiFilter,
  FiX,
  FiLoader,
  FiTruck,
} from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSearchContext } from "../../context/SearchContext";
import useCatagory from "../../hooks/useCatagory";
import { useCartContext } from "../../context/CartContext";

// Category image mapping
const categoryImages = {
  'women': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&auto=format&fit=crop',
  'men': 'https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?w=800&auto=format&fit=crop',
  'kids': 'https://img.freepik.com/free-photo/dancing-team-studio_1303-10936.jpg?ga=GA1.1.1831392564.1735352187&semt=ais_hybrid&w=740',
  'electronics': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
  'accessories': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop',
  'footwear': 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&auto=format&fit=crop',
};

// Helper function to get category image
const getCategoryImage = (categoryName) => {
  if (!categoryName) return 'https://img.freepik.com/free-photo/stylish-man-wearing-hat-standing-wardrobe_23-2148401436.jpg';
  
  const lowerName = categoryName.toLowerCase();
  for (const [key, value] of Object.entries(categoryImages)) {
    if (lowerName.includes(key)) {
      return value;
    }
  }
  return 'https://img.freepik.com/free-photo/stylish-man-wearing-hat-standing-wardrobe_23-2148401436.jpg';
};

// Beautiful loading skeleton component
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-gray-100 rounded-lg overflow-hidden">
          <div className="relative pt-[80%] bg-gray-200"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="flex justify-between pt-4">
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
              <div className="h-8 bg-gray-300 rounded-full w-8"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


export const CategoryShowcase = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { searchQuery } = useSearchContext();
  const { isCategories, isLoading } = useCatagory();
  const {isCart,setIsCart}=useCartContext();

  // Slider settings
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Fetch all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-list/${page}`
      );
      if (data.success) {
        setFeaturedProducts(data.products.slice(0, 6));
      }
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Failed to load products",
        {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // Get total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-count`
      );
      if (data.success) {
        setTotal(data.count);
      }
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Failed to load total products",
        {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    }
  };

  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  // Filter products based on selected category and search query
  const filteredProducts = featuredProducts.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.catagory?._id === selectedCategory
      : true;
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const loadMoreProducts = async () => {
    try {
      setLoadingMore(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-list/${page}`
      );
      if (data.success) {
        setFeaturedProducts((prevProducts) => [...prevProducts, ...data.products]);
      }
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.message || "Failed to load more products",
        {
          variant: "error",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMoreProducts();
  }, [page]);

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
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Collections
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover premium products curated for style, quality, and innovation.
          </p>
        </div>

        {/* Category Slider with Dynamic Backgrounds */}
        <div className="mb-16">
          {isLoading ? (
            <div className="p-8 text-center flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiShoppingBag className="w-5 h-5 text-orange-500 animate-pulse" />
                </div>
              </div>
              <p className="mt-4 text-gray-600">Loading categories...</p>
            </div>
          ) : isCategories.length > 0 ? (
            <Slider {...sliderSettings} className="category-slider">
              {isCategories.map((category) => (
                <div key={category._id} className="px-2">
                  <div className="relative group overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white h-full">
                    <div className="relative h-64">
                      <img
                        src={category.image || getCategoryImage(category.name)}
                        alt={category.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                        <Link
                          to={`/categories/${category.slug}`}
                          className="inline-flex items-center text-white hover:text-orange-300 font-medium text-sm transition-colors duration-300 group-hover:translate-x-1 cursor-pointer"
                        >
                          Shop Now <FiArrowRight className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="col-span-4 py-12 text-center">
              <div className="text-gray-400 mb-4">
                <FiShoppingBag className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-500">
                No categories available at the moment.
              </p>
            </div>
          )}
        </div>

        {/* Featured Products Section */}
        <div className="mb-16">
          {/* Header with Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
              <div className="w-16 h-1 bg-orange-500 mt-2"></div>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
              >
                <FiFilter />
                <span>Filters</span>
              </button>
              
              {/* Desktop Category Filter */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-gray-600 whitespace-nowrap">Filter by:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      !selectedCategory
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    All Categories
                  </button>
                  {isCategories.slice(0, 4).map((category) => (
                    <button
                      key={category._id}
                      onClick={() => setSelectedCategory(category._id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                        selectedCategory === category._id
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Filter Panel */}
          {showMobileFilters && (
            <div className="md:hidden mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Filters</h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  <FiX />
                </button>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Categories</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setShowMobileFilters(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                      !selectedCategory
                        ? "bg-orange-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    All Categories
                  </button>
                  {isCategories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => {
                        setSelectedCategory(category._id);
                        setShowMobileFilters(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                        selectedCategory === category._id
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Active Filter Indicator */}
          {selectedCategory && (
            <div className="mb-6 flex items-center gap-2">
              <span className="text-sm text-gray-600">Active filter:</span>
              <div className="inline-flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                {isCategories.find(c => c._id === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="ml-2 text-orange-600 hover:text-orange-800 cursor-pointer"
                >
                  <FiX size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-200 hover:border-orange-500 relative"
                    >
                      {/* Product Image */}
                      <div className="relative pt-[80%] overflow-hidden">
                        <img
                          src={`${import.meta.env.VITE_APP_API}/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                          className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/400x400?text=Product+Image")
                          }
                          loading="lazy"
                        />
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
                        
                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       
                          <Link to={`/product/${product.slug}`} 
                            className="p-2 bg-white rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                            title="Quick view"
                          >
                            <FiEye />
                          </Link>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 flex-1">
                            {product.name}
                          </h3>
                          <span className="text-xs text-gray-500 ml-2">
                            {product.catagory?.name}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                        
                        {/* Price and Actions */}
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
                          
                          <div className="flex space-x-2">
                            <Link
                              to={`/product/${product.slug}`}
                              className="p-2 rounded-md bg-gray-100 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                              title="View details"
                            >
                              <FiArrowRight />
                            </Link>
                            <button 
                              className="p-2 rounded-md bg-orange-200 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                              disabled={product.quantity <= 0}
                              title={product.quantity <= 0 ? "Out of stock" : "Add to cart"}
                              onClick={()=>handleAddToCart(product)}
                              
                            >
                              <FiShoppingBag />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 py-12 text-center md:col-span-4 lg:col-span-5 xl:col-span-6">
                    <div className="text-gray-400 mb-4">
                      <FiShoppingBag className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-gray-500">
                      No products found in this category.
                    </p>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Load More Button */}
              {featuredProducts.length < total && (
                <div className="mt-10 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className={`px-6 py-3 rounded-md cursor-pointer font-medium transition-colors duration-300 ${
                      loadingMore
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg'
                    } flex items-center justify-center mx-auto min-w-[180px]`}
                  >
                    {loadingMore ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Loading...
                      </>
                    ) : (
                      'Load More'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Promotional Banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#1a1a2e] to-[#16213e] mb-16 shadow-xl">
  {/* Background pattern with subtle opacity */}
  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&auto=format&fit=crop&q=80&blend=1A1A2E&blend-mode=multiply')] bg-cover bg-center opacity-20"></div>
  
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-32 h-32 bg-[#FF851B] opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
  <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#FF851B] opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
  
  <div className="relative z-10 p-8 lg:p-12 xl:p-16">
    <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
      {/* Text content */}
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
          <span className="text-xs font-semibold tracking-wider text-[#FF851B] uppercase">
            Free Express Shipping
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
          Fast & Reliable <span className="text-[#FF851B]">Delivery</span> to Your Doorstep
        </h3>
        <p className="text-white/80 mb-6 max-w-2xl mx-auto lg:mx-0 text-lg">
          Enjoy free express shipping on all orders over $50. Delivered in 2-3 business days with our premium logistics partners.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            to="/"
            className="px-8 py-3.5 bg-gradient-to-r from-[#FF851B] to-[#e76b1e] text-white font-semibold hover:from-[#e76b1e] hover:to-[#d45e1a] transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
          >
            <HiOutlineShoppingBag className="text-xl" />
            Shop Now
          </Link>
          <Link
            to="/shipping-info"
            className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 rounded-lg cursor-pointer flex items-center justify-center gap-2"
          >
            <FiTruck className="text-xl" />
            Shipping Details
          </Link>
        </div>
      </div>
      
      {/* Visual element */}
      <div className="hidden lg:block relative">
        <div className="relative w-64 h-64 xl:w-72 xl:h-72">
          <div className="absolute inset-0 bg-[#FF851B] opacity-20 rounded-full blur-xl"></div>
          <div className="relative z-10 p-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl">
              <div className="animate-float">
                <FiTruck className="text-[#FF851B] text-6xl mx-auto" />
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FF851B]"></div>
                  <span className="text-white text-sm font-medium">24/7 Tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FF851B]"></div>
                  <span className="text-white text-sm font-medium">Contactless Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FF851B]"></div>
                  <span className="text-white text-sm font-medium">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Animated tracking line */}
  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF851B] to-transparent opacity-30 animate-pulse"></div>
</div>
      </div>
    </section>
  );
};