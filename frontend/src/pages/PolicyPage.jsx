import React from 'react';
import Layout from '../components/layout/Layout';
import { FaShieldAlt, FaLock, FaUserCheck } from 'react-icons/fa';

export default function PolicyPage() {
  return (
    <Layout>
      <section className="bg-gradient-to-br from-orange-50 via-cream-100 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center animate-in zoom-in-75 fade-in duration-500">
            <div className="inline-block mb-6 px-5 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full shadow-sm">
              <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">Your Privacy Matters</p>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight bg-clip-text bg-gradient-to-r from-orange-500 to-teal-500">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              At HypeHive, we’re committed to protecting your privacy and keeping your data safe. Here’s how we do it.
            </p>
          </div>

          {/* Illustration */}
          <div className="mt-12 relative flex justify-center">
            <div className="absolute inset-0 max-w-sm mx-auto blur-3xl bg-gradient-to-r from-orange-300/30 to-teal-300/30 rounded-full"></div>
            <svg
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-orange-300 dark:text-teal-700 animate-pulse relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m0 0c-1.1 0-2-.9-2-2s.9-2 2-2zm0 0V3m-7 9H3m18 0h-4M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Policy Sections */}
          <div className="mt-16 space-y-14">
            {[
              {
                icon: <FaShieldAlt className="text-3xl text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300" />,
                title: "Introduction",
                bg: "bg-orange-100 dark:bg-orange-900",
                content: `Welcome to HypeHive’s Privacy Policy. We value your trust and are dedicated to safeguarding your personal information. This policy explains what data we collect, how we use it, and your rights regarding your data. Last updated: April 11, 2025.`,
              },
              {
                icon: <FaLock className="text-3xl text-teal-500 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300" />,
                title: "Data We Collect",
                bg: "bg-teal-100 dark:bg-teal-900",
                content: `We collect information to enhance your shopping experience, including:`,
                list: [
                  "Personal Info: Name, email, phone number, and address when you create an account or place an order.",
                  "Payment Details: Processed securely via trusted third-party providers (we don’t store your card info).",
                  "Browsing Data: IP address, browser type, and pages visited to improve our site.",
                  "Preferences: Wishlists, cart items, and product reviews to personalize your experience.",
                ],
              },
              {
                icon: <FaUserCheck className="text-3xl text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300" />,
                title: "How We Use Your Data",
                bg: "bg-cream-200 dark:bg-cream-900",
                content: `Your data helps us provide a seamless HypeHive experience. We use it to:`,
                list: [
                  "Process and deliver your orders.",
                  "Send order updates and promotional offers (you can opt out anytime).",
                  "Improve our website and tailor recommendations.",
                  "Prevent fraud and ensure site security.",
                ],
              },
              {
                icon: <FaShieldAlt className="text-3xl text-orange-500 dark:text-orange-400 group-hover:scale-110 transition-transform duration-300" />,
                title: "Sharing Your Data",
                bg: "bg-orange-100 dark:bg-orange-900",
                content: `We only share your data when necessary, such as:`,
                list: [
                  "With trusted delivery partners to ship your orders.",
                  "With payment processors to handle transactions securely.",
                  "To comply with legal obligations or protect our rights.",
                  "We never sell your data to third parties.",
                ],
              },
              {
                icon: <FaUserCheck className="text-3xl text-teal-500 dark:text-teal-400 group-hover:scale-110 transition-transform duration-300" />,
                title: "Your Rights",
                bg: "bg-teal-100 dark:bg-teal-900",
                content: `You’re in control of your data. You have the right to:`,
                list: [
                  "Access or update your personal information.",
                  "Request deletion of your data.",
                  "Opt out of marketing emails.",
                  `Contact us at help@hypehive.com for any requests.`,
                ],
              },
            ].map((section, i) => (
              <div
                key={i}
                className="group animate-in fade-in slide-in-from-bottom-10 duration-500"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
                  <div className={`p-4 ${section.bg} rounded-full shadow-md group-hover:shadow-lg transition-all duration-300`}>
                    {section.icon}
                  </div>
                  <h2 className="ml-0 sm:ml-4 mt-4 sm:mt-0 text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center sm:text-left">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{section.content}</p>
                {section.list && (
                  <ul className="mt-4 list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                    {section.list.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-10 duration-500">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Questions?</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Reach out to us at{' '}
              <a href="mailto:help@hypehive.com" className="text-orange-500 hover:underline">
                help@hypehive.com
              </a>{' '}
              or call{' '}
              <a href="tel:+92 (15) 473-9970" className="text-orange-500 hover:underline">
              +92 (15) 473-9970
              </a>{' '}
              for support.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
