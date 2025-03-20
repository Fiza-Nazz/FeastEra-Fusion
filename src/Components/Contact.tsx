'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, IdentificationIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const buttonVariants = {
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap: { scale: 0.97 }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call delay (replace with actual API integration)
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
      // Hide success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-pink-100 to-white py-20">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-pink-700">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-pink-600">
            We would love to hear from you. Please fill out the form below with your details, and we’ll get back to you shortly.
          </p>
        </motion.div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-3xl mx-auto px-4 py-4 bg-green-100 border border-green-300 rounded-lg text-green-800 text-center mb-6"
          >
            Thank you! Your message has been sent.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white shadow-xl rounded-lg p-8 border border-pink-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-pink-700 font-medium mb-2">Name</label>
                <div className="flex items-center border border-pink-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-pink-500 transition-all">
                  <IdentificationIcon className="w-5 h-5 text-pink-500 mr-2" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    required
                    className="w-full focus:outline-none"
                  />
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-pink-700 font-medium mb-2">Email</label>
                <div className="flex items-center border border-pink-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-pink-500 transition-all">
                  <EnvelopeIcon className="w-5 h-5 text-pink-500 mr-2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                    required
                    className="w-full focus:outline-none"
                  />
                </div>
              </motion.div>
            </div>

            {/* Row 2: Phone and Subject */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-pink-700 font-medium mb-2">Phone</label>
                <div className="flex items-center border border-pink-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-pink-500 transition-all">
                  <PhoneIcon className="w-5 h-5 text-pink-500 mr-2" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your Phone Number"
                    required
                    className="w-full focus:outline-none"
                  />
                </div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.01 }}>
                <label className="block text-pink-700 font-medium mb-2">Subject</label>
                <div className="flex items-center border border-pink-200 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-pink-500 transition-all">
                  <PencilSquareIcon className="w-5 h-5 text-pink-500 mr-2" />
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Subject"
                    required
                    className="w-full focus:outline-none"
                  />
                </div>
              </motion.div>
            </div>

            {/* Row 3: Message */}
            <motion.div whileHover={{ scale: 1.01 }}>
              <label className="block text-pink-700 font-medium mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your Message"
                rows={5}
                required
                className="w-full border border-pink-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              <EnvelopeIcon className="w-5 h-5" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Contact Info Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto px-4 py-8"
      >
        <div className="flex flex-col md:flex-row justify-around items-center bg-pink-50 rounded-lg p-6 border border-pink-100 shadow-sm">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <PhoneIcon className="w-6 h-6 text-pink-600" />
            <span className="text-pink-700 font-medium">+92 3123632197</span>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 mt-4 md:mt-0">
            <EnvelopeIcon className="w-6 h-6 text-pink-600" />
            <span className="text-pink-700 font-medium">FizaNaazz321@gmail.com</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
