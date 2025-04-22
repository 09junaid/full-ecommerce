import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8">
      {/* Section Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block h-8 w-full text-gray-100"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,64C672,75,768,85,864,80C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32V100H1392C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100H0Z"
          />
        </svg>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div>
            <img
              src={logo}
              className="mb-4 transform hover:scale-105 transition-transform duration-300"
              height={150}
              width={150}
              alt="logo"
            />
            <p className="text-gray-600 text-sm leading-relaxed">
              Your one-stop shop for quality products and amazing deals. Explore our wide range of items curated just for you.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><NavLink to="/" className="hover:text-[#E57317] hover:underline transition">Home</NavLink></li>
              <li><Link to="/" className="hover:text-[#E57317] hover:underline transition">Shop</Link></li>
              <li><NavLink to="/about" className="hover:text-[#E57317] hover:underline transition">About Us</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-[#E57317] hover:underline transition">Contact</NavLink></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Support</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li><Link to="/shipping-info" className="hover:text-[#E57317] hover:underline transition">FAQ</Link></li>
              <li><Link to="/shipping-info" className="hover:text-[#E57317] hover:underline transition">Shipping</Link></li>
              <li><Link to="/shipping-info" className="hover:text-[#E57317] hover:underline transition">Returns</Link></li>
              <li><NavLink to="/policy" className="hover:text-[#E57317] hover:underline transition">Privacy Policy</NavLink></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Get in Touch</h4>
            <p className="text-gray-600 text-sm mb-4">
              Email: <span className="text-[#E57317]">support@HypeHive.com</span><br />
              Phone: <span className="text-[#E57317]">+92 (15) 473-9970</span>
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-[#E57317] transition transform hover:scale-125"><FaFacebook className="text-xl" /></a>
              <a href="#" className="text-gray-600 hover:text-[#E57317] transition transform hover:scale-125"><FaTwitter className="text-xl" /></a>
              <a href="#" className="text-gray-600 hover:text-[#E57317] transition transform hover:scale-125"><FaInstagram className="text-xl" /></a>
              <a href="#" className="text-gray-600 hover:text-[#E57317] transition transform hover:scale-125"><FaLinkedin className="text-xl" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-gray-300 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} HypeHive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
