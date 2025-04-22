import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade: true,
    pauseOnHover: false,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    adaptiveHeight: true
  };

  const slides = [
    {
      title: 'Elevate Your Style',
      description: 'Premium collections with exclusive member benefits',
      buttonText: 'Shop Collection',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&auto=format&fit=crop&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
      highlight: 'Top trends',
      discount: 'Free Shipping'
    },
    {
      title: 'Summer Essentials',
      description: 'Lightweight fabrics for maximum comfort',
      buttonText: 'Explore Now',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&auto=format&fit=crop&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop&q=80',
      highlight: 'Limited Edition',
      discount: 'Free Shipping'
    },
    {
      title: 'Luxury Redefined',
      description: 'Handcrafted pieces with timeless elegance',
      buttonText: 'Discover More',
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1600&auto=format&fit=crop&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop&q=80',
      highlight: 'Exclusive',
      discount: 'VIP Access'
    }
  ];

  return (
    <section className="relative w-full h-auto min-h-[300px] md:h-screen md:max-h-[900px] overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-[300px] sm:h-[400px] md:h-screen md:max-h-[900px]">
            {/* Parallax Background with responsive image */}
            <div className="absolute inset-0 overflow-hidden">
              <picture>
                <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
                <source media="(min-width: 768px)" srcSet={slide.image} />
                <img 
                  src={slide.image} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover object-center transform scale-110 hover:scale-100 transition-transform duration-[10000ms] ease-out"
                  loading="eager"
                />
              </picture>
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-start justify-center h-full text-left px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32 2xl:px-48 py-16 md:py-0">
              {/* Highlight Badge */}
              <div className="flex flex-wrap items-center mb-3 sm:mb-4 md:mb-6 space-x-2 sm:space-x-3 md:space-x-4">
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-white uppercase bg-[#FF851B] rounded-full animate-fadeIn">
                  {slide.highlight}
                </span>
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs md:text-sm font-bold tracking-wider text-[#FF851B] uppercase bg-white rounded-full animate-fadeIn delay-100">
                  {slide.discount}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight animate-slideUp">
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className="inline-block mr-1 sm:mr-2 hover:text-[#FF851B] transition-colors duration-500">
                    {word}
                  </span>
                ))}
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl animate-slideUp delay-200">
                {slide.description}
              </p>
              
              <div className="flex space-x-2 sm:space-x-3 md:space-x-4 animate-slideUp delay-300">
                <a
                  href="#shop"
                  className="relative px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 text-sm sm:text-base md:text-lg font-bold text-white bg-[#FF851B] rounded-full hover:bg-[#e57317] transition-all duration-300 group overflow-hidden"
                >
                  <span className="relative z-10">{slide.buttonText}</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom styles */}
      <style jsx global>{`
        /* Dots customization - responsive */
        .slick-dots {
          bottom: 20px !important;
        }
        @media (min-width: 640px) {
          .slick-dots {
            bottom: 30px !important;
          }
        }
        @media (min-width: 768px) {
          .slick-dots {
            bottom: 40px !important;
          }
        }
        .slick-dots li {
          margin: 0 4px !important;
          width: 8px !important;
          height: 8px !important;
        }
        @media (min-width: 640px) {
          .slick-dots li {
            margin: 0 6px !important;
            width: 10px !important;
            height: 10px !important;
          }
        }
        @media (min-width: 768px) {
          .slick-dots li {
            margin: 0 8px !important;
            width: 12px !important;
            height: 12px !important;
          }
        }
        .slick-dots li button {
          width: 100% !important;
          height: 100% !important;
          padding: 0 !important;
        }
        .slick-dots li button:before {
          color: rgba(255,255,255,0.5) !important;
          opacity: 1 !important;
          font-size: inherit !important;
          line-height: 1 !important;
          width: 100% !important;
          height: 100% !important;
          content: '' !important;
          background: currentColor;
          border-radius: 50%;
        }
        .slick-dots li.slick-active {
          width: 12px !important;
          height: 12px !important;
        }
        @media (min-width: 640px) {
          .slick-dots li.slick-active {
            width: 14px !important;
            height: 14px !important;
          }
        }
        @media (min-width: 768px) {
          .slick-dots li.slick-active {
            width: 16px !important;
            height: 16px !important;
          }
        }
        .slick-dots li.slick-active button:before {
          color: #FF851B !important;
          background: #FF851B !important;
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .animate-slideUp {
          opacity: 0;
          animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Touch device optimizations */
        @media (hover: none) {
          .slick-dots li button:before {
            color: rgba(255,255,255,0.7) !important;
          }
          .slick-dots li.slick-active button:before {
            color: #FF851B !important;
            background: #FF851B !important;
          }
        }
      `}</style>
    </section>
  );
};