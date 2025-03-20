'use client';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPinterest, FaLinkedin } from 'react-icons/fa';
import { MdOutlineMail, MdPhoneInTalk, MdLocationOn } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const { register, handleSubmit, reset } = useForm<NewsletterFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { icon: FaFacebook, name: 'Facebook', url: 'https://www.facebook.com/', color: '#3b5998' },
    { icon: FaInstagram, name: 'Instagram', url: 'https://www.instagram.com/fz_tech63?igsh=eDg5ZnA4ZmUyb3B6', color: '#E1306C' },
    { icon: FaTwitter, name: 'Twitter', url: 'https://x.com/FizaNazzx', color: '#1DA1F2' },
    { icon: FaYoutube, name: 'YouTube', url: 'https://www.youtube.com/', color: '#FF0000' },
    { icon: FaPinterest, name: 'Pinterest', url: '#', color: '#BD081C' },
    { icon: FaLinkedin, name: 'LinkedIn', url: 'https://www.linkedin.com/in/fiza-nazz-765241355/', color: '#0077B5' },
  ];

  const footerLinks = [
    {
      title: 'Quick Links',
      links: ['About Us', 'Our Menu', 'Special Offers', 'Delivery Areas', 'Careers'],
    },
    {
      title: 'Support',
      links: ['FAQ', 'Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
    },
    {
      title: 'Contact Info',
      content: [
        { icon: MdLocationOn, text: '13 Food Street, karachi City' },
        { icon: MdPhoneInTalk, text: '+92 312 3632197' },
        { icon: MdOutlineMail, text: 'FizaNaazz321@gmail.com' },
      ],
    },
  ];

  interface NewsletterFormData {
    email: string;
  }

  const handleNewsletter = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { email: data.email },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );
      toast.success('Thank you for subscribing! 🎉');
      reset();
    } catch {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-white border-t-2 border-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        className="absolute -top-32 -right-32 w-64 h-64 bg-pink-100 rounded-full opacity-20"
      />
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h3 className="text-3xl font-bold text-pink-600 mb-4">Stay Updated</h3>
          <form onSubmit={handleSubmit(handleNewsletter)} className="max-w-2xl mx-auto flex gap-4">
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border-2 border-pink-100 focus:outline-none focus:border-pink-300 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-pink-600 text-white rounded-full font-medium hover:bg-pink-700 transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <MdOutlineMail className="w-5 h-5" />
                  Subscribe
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Footer Content Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-pink-900 mb-3">{section.title}</h4>
              {section.links ? (
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <motion.li
                      key={link}
                      whileHover={{ x: 5 }}
                      className="text-gray-600 hover:text-pink-600 transition-colors cursor-pointer"
                    >
                      {link}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-3">
                  {section.content?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-600">
                      <item.icon className="w-5 h-5 text-pink-500 flex-shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-pink-900 mb-3">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, color, name, url }) => (
                <motion.a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors relative group"
                  style={{ color }}
                >
                  <Icon className="w-6 h-6" />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-2 py-1 rounded-md 
                    text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    {name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="pt-8 border-t border-pink-100 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-600 text-center">
            © {new Date().getFullYear()} FoodieLove. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="text-gray-600 hover:text-pink-600 cursor-pointer"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="text-gray-600 hover:text-pink-600 cursor-pointer"
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-4 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition-colors"
      >
        ↑
      </motion.button>
    </footer>
  );
};

export default Footer;





