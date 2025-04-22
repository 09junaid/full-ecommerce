import { FiTruck, FiClock, FiShield, FiBox, FiMapPin, FiRefreshCw,FiChevronRight,FiChevronDown } from "react-icons/fi";
import Layout from "../components/layout/Layout";

const ShippingDetailsPage = () => {
  return (
    <Layout>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
        <div className="w-24 h-1 bg-[#FF851B] mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We partner with premium logistics providers to ensure your orders arrive safely and on time.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Options */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Methods */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FiTruck className="text-[#FF851B]" />
                Delivery Options
              </h2>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#FF851B]/10 flex items-center justify-center">
                      <FiTruck className="text-[#FF851B] text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Standard Shipping</h3>
                    <p className="text-gray-600 mb-2">3-5 business days</p>
                    <p className="text-sm text-gray-500">Free on orders over $50, otherwise $4.99</p>
                  </div>
                  <div className="sm:ml-auto">
                    <span className="inline-block px-3 py-1 bg-[#FF851B]/10 text-[#FF851B] text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 p-5 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <FiClock className="text-blue-600 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Express Shipping</h3>
                    <p className="text-gray-600 mb-2">1-2 business days</p>
                    <p className="text-sm text-gray-500">$9.99 for all orders</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 p-5 rounded-lg border border-gray-200">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <FiBox className="text-green-600 text-xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Same-Day Delivery</h3>
                    <p className="text-gray-600 mb-2">Order by 12 PM</p>
                    <p className="text-sm text-gray-500">$14.99 - Available in select areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking & Support */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FiMapPin className="text-[#FF851B]" />
                Order Tracking & Support
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF851B]/10 flex items-center justify-center">
                      <FiRefreshCw className="text-[#FF851B]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Track Your Order</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Once your order ships, you'll receive a tracking number via email to monitor your package in real-time.
                  </p>
                  <button className="text-[#FF851B] font-medium hover:text-[#e76b1e] transition-colors flex items-center gap-1">
                    Track Now <FiChevronRight className="mt-0.5" />
                  </button>
                </div>

                <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF851B]/10 flex items-center justify-center">
                      <FiShield className="text-[#FF851B]" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Shipping Support</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Need help with your delivery? Our support team is available 24/7 to assist with any shipping inquiries.
                  </p>
                  <button className="text-[#FF851B] font-medium hover:text-[#e76b1e] transition-colors flex items-center gap-1">
                    Contact Support <FiChevronRight className="mt-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Policies */}
        <div className="space-y-8">
          {/* Delivery Coverage */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FiMapPin className="text-[#FF851B]" />
                Delivery Coverage
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-[#FF851B]/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF851B]"></div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    We deliver to all 50 U.S. states with additional international shipping options.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-[#FF851B]/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF851B]"></div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Same-day delivery available in major metropolitan areas (check at checkout).
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-[#FF851B]/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF851B]"></div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    International shipping available to 30+ countries with calculated duties at checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FiRefreshCw className="text-[#FF851B]" />
                Return Policy
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-[#FF851B]/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF851B]"></div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    30-day hassle-free returns on most items (exclusions apply).
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-[#FF851B]/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF851B]"></div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Free return shipping for U.S. orders over $50.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-[#FF851B]/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF851B]"></div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Refunds processed within 3-5 business days after receiving returned items.
                  </p>
                </div>
              </div>
              
              <button className="mt-6 text-[#FF851B] font-medium hover:text-[#e76b1e] transition-colors flex items-center gap-1">
                View Full Return Policy <FiChevronRight className="mt-0.5" />
              </button>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping FAQs</h2>
              
              <div className="space-y-4">
                <details className="group border-b border-gray-200 pb-4">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <span className="font-medium text-gray-900 group-hover:text-[#FF851B] transition-colors">
                      How do I change my shipping address?
                    </span>
                    <FiChevronDown className="text-gray-400 group-open:rotate-180 transform transition-transform" />
                  </summary>
                  <p className="mt-2 text-gray-600">
                    You can update your shipping address within 1 hour of placing your order by contacting our support team. After that window, changes may not be possible as orders enter processing.
                  </p>
                </details>
                
                <details className="group border-b border-gray-200 pb-4">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <span className="font-medium text-gray-900 group-hover:text-[#FF851B] transition-colors">
                      What if I'm not home for delivery?
                    </span>
                    <FiChevronDown className="text-gray-400 group-open:rotate-180 transform transition-transform" />
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Our carriers will attempt delivery 3 times. After that, packages are held at local facilities for 5 business days before being returned. You can also provide delivery instructions at checkout.
                  </p>
                </details>
                
                <details className="group border-b border-gray-200 pb-4">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <span className="font-medium text-gray-900 group-hover:text-[#FF851B] transition-colors">
                      Do you ship internationally?
                    </span>
                    <FiChevronDown className="text-gray-400 group-open:rotate-180 transform transition-transform" />
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Yes, we ship to over 30 countries. International orders may be subject to customs fees and import duties which are the responsibility of the recipient.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ShippingDetailsPage;