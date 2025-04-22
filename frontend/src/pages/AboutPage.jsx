import React from 'react';
import Layout from '../components/layout/Layout';
import { FaRocket, FaLightbulb, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../assets/images/logo.png'
import profile from '../assets/images/profile-pic.png'

export default function AboutPage() {
  // Animation variants for Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <Layout>
      <section className="bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="inline-flex items-center mb-6 px-6 py-2 bg-orange-100 dark:bg-orange-900/50 rounded-full shadow-sm">
              <span className="text-sm font-medium text-orange-600 dark:text-orange-300">
                Who We Are
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              About HypeHive
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We’re a vibrant community passionate about sparking joy, creativity, and connection through exceptional shopping experiences.
            </p>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            className="mt-12 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200/30 to-teal-200/30 blur-2xl rounded-full -z-10"></div>
            <img
              src={logo}
              alt="HypeHive Community"
              className="w-full max-w-md mx-auto rounded-2xl"
            />
          </motion.div>

          {/* Content Sections */}
          <motion.div
            className="mt-20 space-y-20"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Mission */}
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-10"
              variants={fadeInUp}
            >
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center mb-6 p-4 bg-orange-100 dark:bg-orange-900/50 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                  <FaRocket className="text-3xl text-orange-500 dark:text-orange-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Our Mission
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  HypeHive is dedicated to transforming shopping into an adventure, offering unique products, unbeatable deals, and a vibrant community experience.
                </p>
              </div>
              <div className="flex-1 mt-6 lg:mt-0">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Mission"
                  className="w-full h-80 object-cover rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              className="flex flex-col lg:flex-row-reverse items-center gap-10"
              variants={fadeInUp}
            >
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center mb-6 p-4 bg-teal-100 dark:bg-teal-900/50 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                  <FaLightbulb className="text-3xl text-teal-500 dark:text-teal-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Our Vision
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  We aim to redefine online shopping by creating a platform where every purchase inspires creativity, fosters community, and tells a unique story.
                </p>
              </div>
              <div className="flex-1 mt-6 lg:mt-0">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Vision"
                  className="w-full h-80 object-cover rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </motion.div>

            {/* Team */}
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="inline-flex items-center mb-6 p-4 bg-orange-100 dark:bg-orange-900/50 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                <FaUsers className="text-3xl text-orange-500 dark:text-orange-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Our Team
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Our team is a passionate group of innovators, curators, and customer advocates committed to delivering an exceptional shopping experience.
              </p>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: 'Junaid Arshad', role: 'Founder & CEO' },
                  { name: 'Junaid Arshad', role: 'Head of Product' },
                  { name: 'Junaid Arshad', role: 'Chief Marketing Officer' },
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden ring-2 ring-orange-200 dark:ring-orange-700">
                      <img
                        src={profile}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {member.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}