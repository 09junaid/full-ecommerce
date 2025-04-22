import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { FaEnvelope, FaPhone, FaHeadset, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, zoomIn, slideIn } from "../utils/motion";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import { useSnackbar } from "notistack";

export default function ContactPage() {
  const [auth] = useAuth();
  const [formData, setFormData] = useState({
    name: auth?.user?.name,
    email: auth?.user?.email,
    subject: "",
    message: "",
    location: { lat: "", lng: "" },
  });
  const { enqueueSnackbar } = useSnackbar();


  // Capture user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              lat: position.coords.latitude.toString(),
              lng: position.coords.longitude.toString(),
            },
          }));
        },
        (err) => {
          console.error("Geolocation error:", err);
          enqueueSnackbar(
            "Could not retrieve location. Please allow location access.",
            { variant: "error",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      );
    } else {
      enqueueSnackbar(
            "Geolocation is not supported by your browser.",
            { variant: "error",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
    }
  }, []);

  const getDirectionsUrl = () => {
    const destination = encodeURIComponent('123 Hive Street, Digital City, DC 10001');
    if (formData.location.lat && formData.location.lng) {
      return `https://www.google.com/maps/dir/?api=1&origin=${formData.location.lat},${formData.location.lng}&destination=${destination}`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
  };
  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/contact/user-contact",
        formData
      );
      setFormData({
        name: auth?.user?.name,
        email:auth?.user?.email,
        subject: "",
        message: "",
        location: { lat: formData.location.lat, lng: formData.location.lng },
      });
      enqueueSnackbar(response.data.message, { variant: "success",
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
    } catch (err) {
      enqueueSnackbar(err.response?.data?.error, { variant: "error",
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      }
    }
    );
    }
  };

  const contactMethods = [
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email Us",
      info: "help@hypehive.com",
      href: "mailto:help@hypehive.com",
    },
    {
      icon: <FaPhone className="text-3xl" />,
      title: "Call Us",
      info: "0322-2877270",
      href: "tel:+923222877270",
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "Toll-Free",
      info: "1800-0000-00000",
      href: "tel:180000000000",
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Visit Us",
      info: "123 Hive Street, Digital City",
      href: "#",
    },
  ];

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-6xl w-full"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              variants={fadeIn("up", "tween", 0.1, 1)}
              className="inline-flex items-center mb-6 px-4 py-2 bg-[#FF851B]/10 rounded-full"
            >
              <span className="text-sm font-medium text-[#FF851B] tracking-wider">
                WE'D LOVE TO HEAR FROM YOU
              </span>
            </motion.div>
            <motion.h1
              variants={fadeIn("up", "tween", 0.2, 1)}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Let's <span className="text-[#FF851B]">Connect</span>
            </motion.h1>
            <motion.p
              variants={fadeIn("up", "tween", 0.3, 1)}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Our team is ready to assist you with any questions about our
              products or services.
            </motion.p>
          </div>

          {/* Contact Cards */}
          <motion.div
            variants={staggerContainer}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "tween", 0.2 + index * 0.1, 1)}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 bg-white border border-gray-100"
              >
                <div className="w-16 h-16 flex items-center justify-center mx-auto rounded-2xl mb-6 bg-[#FF851B]/10 text-[#FF851B] group-hover:scale-110 transition-transform">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-900 mb-3">
                  {method.title}
                </h3>
                <a
                  href={method.href}
                  className="block text-center text-gray-600 hover:text-[#FF851B] transition-colors"
                >
                  {method.info}
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={slideIn("up", "tween", 0.4, 1)}
            className="mt-20 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
          >
            <div className="grid md:grid-cols-2">
              {/* Visual Section */}
              <div className="hidden md:block relative bg-[#FF851B]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-15"></div>
                <div className="relative h-full p-12 flex flex-col justify-center">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl font-bold text-white mb-6"
                  >
                    Get in Touch
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-white/90 mb-8"
                  >
                    Have a project in mind or want to learn more about our
                    services? Fill out the form and we'll get back to you within
                    24 hours.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <FaEnvelope className="text-white text-xl" />
                      </div>
                      <span className="text-white">help@hypehive.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <FaPhone className="text-white text-xl" />
                      </div>
                      <span className="text-white">+1 (555) 123-4567</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Form Section */}
              <div className="p-8 sm:p-12">
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id={"name"}
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF851B] focus:border-transparent transition-all"
                        placeholder="Junaid"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id={"email"}
                        autoComplete="email"
                        value={formData.email }
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF851B] focus:border-transparent transition-all"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF851B] focus:border-transparent transition-all"
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#FF851B] focus:border-transparent transition-all"
                        placeholder="Tell us about your project..."
                        required
                      ></textarea>
                    </div>
                    {/* {status && <p className="text-green-600">{status}</p>}
                    {error && <p className="text-red-600">{error}</p>} */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 px-6 bg-[#FF851B] cursor-pointer text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Send Message
                    </motion.button>
                  </div>
                </motion.form>
              </div>
            </div>
          </motion.div>

          {/* Location Map */}
          <motion.div
            variants={zoomIn(0.5, 1)}
            className="mt-20 rounded-3xl overflow-hidden shadow-xl border border-gray-200"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573813345!2d-73.98784492416449!3d40.74844047138992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2us!4v1690834537429!5m2!1sen!2sus"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[450px]"
              ></iframe>
            </div>
            <div className="bg-white p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Our Headquarters
                  </h3>
                  <p className="text-gray-600">
                    123 Hive Street, Digital City, DC 10001
                  </p>
                </div>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-[#FF851B] text-white rounded-lg hover:bg-[#E67616] transition-colors"
                >
                  <FaMapMarkerAlt className="mr-2" />
                  Get Directions
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
}
