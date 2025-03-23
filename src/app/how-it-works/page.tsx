'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCheck, FiChevronRight, FiShoppingCart, FiInfo, FiArrowUp } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function HowItWorksPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const [isTop, setIsTop] = useState(true);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  const steps = [
    {
      title: 'Discover Culinary Delights',
      description: 'Explore our curated menu with 1000+ dishes from top restaurants',
      icon: <FiChevronRight />,
      image: '/delight.png'
    },
    {
      title: 'Personalize Your Order',
      description: 'Customize ingredients, portion sizes, and special requests',
      icon: <FiCheck />,
      image: '/logo.png'
    },
    {
      title: 'Instant Gratification',
      description: 'Track your order in real-time with our live GPS system',
      icon: <FiShoppingCart />,
      image: '/gps.png'
    }
  ];

  useEffect(() => {
    const handleScroll = () => setIsTop(window.scrollY < 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white relative overflow-hidden">
      {/* Floating Navigation */}
      <motion.nav 
        className="fixed top-4 right-4 z-50 flex gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white rounded-full shadow-xl"
        >
          <FiInfo className="text-xl text-pink-600" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white rounded-full shadow-xl"
          onClick={scrollToTop}
          animate={{ opacity: isTop ? 0.5 : 1 }}
        >
          <FiArrowUp className="text-xl text-pink-600" />
        </motion.button>
      </motion.nav>

      {/* Parallax Header */}
      <motion.header 
        className="relative h-[60vh] flex items-center justify-center"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-pink-900">
            Seamless Food Journey
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            From craving to satisfaction - experience the future of food delivery
          </p>
        </motion.div>
      </motion.header>

      {/* Interactive Timeline */}
      <motion.main 
        ref={ref}
        className="max-w-7xl mx-auto px-4 py-20 relative"
      >
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-200 to-transparent" />
        
        {steps.map((step, index) => (
          <motion.section
            key={index}
            className="grid md:grid-cols-2 gap-12 items-center mb-32 relative px-4"
            initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Animated Connector */}
            <motion.div
              className="hidden md:block absolute left-1/2 h-32 w-[2px] bg-pink-200"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
            />

            <motion.div
              className={`relative ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} w-full`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-96 overflow-hidden rounded-3xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-white rounded-3xl" />
                {/* Updated Image component usage */}
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover relative z-10 rounded-3xl"
                />
              </div>
            </motion.div>

            <motion.div 
              className={`p-8 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}
              whileInView={{ transition: { staggerChildren: 0.2 } }}
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-pink-600 mb-6 flex items-center justify-center text-white"
                initial={{ rotate: -180, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
              >
                <span className="text-3xl">{step.icon}</span>
              </motion.div>

              <motion.h2
                className="text-3xl font-bold mb-4 text-gray-900"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <span className="text-pink-600">0{index + 1}.</span> {step.title}
              </motion.h2>

              <motion.p
                className="text-gray-600 text-lg mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                {step.description}
              </motion.p>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <button className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors">
                  Learn More
                </button>
                <button className="px-6 py-3 border-2 border-pink-600 text-pink-600 rounded-full hover:bg-pink-50 transition-colors">
                  Watch Video
                </button>
              </motion.div>
            </motion.div>
          </motion.section>
        ))}

        {/* Progress Indicator */}
        <motion.div
          className="fixed top-1/2 right-8 -translate-y-1/2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full mb-4 bg-pink-200 cursor-pointer"
              whileHover={{ scale: 1.5 }}
              onClick={() => {
                document.querySelectorAll('section')[index].scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            />
          ))}
        </motion.div>

        {/* Animated FAQ */}
        <motion.div
          className="max-w-4xl mx-auto mt-32 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Common Questions
          </h2>
          
          {[
            'How long does delivery take?',
            'Can I modify my order?',
            'What payment methods do you accept?'
          ].map((question, index) => (
            <motion.div
              key={index}
              className="border-b border-pink-100 py-6"
              whileHover={{ x: 10 }}
            >
              <div className="flex items-center justify-between cursor-pointer group">
                <span className="text-lg text-gray-800 group-hover:text-pink-600">
                  {question}
                </span>
                <FiChevronRight className="text-xl text-pink-600 transform group-hover:rotate-90 transition-transform" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>

      {/* Animated Footer */}
      <motion.footer 
        className="bg-pink-600 text-white py-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xl mb-4">Hungry for more?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-pink-600 rounded-full font-bold shadow-lg"
          >
            Start Your Order
          </motion.button>
        </div>
      </motion.footer>
    </div>
  );
}
