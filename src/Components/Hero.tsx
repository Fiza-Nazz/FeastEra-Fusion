'use client';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  const PINK = '#FF007A';
  const WHITE = '#FFFFFF';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  // 3D Button Animation settings
  const button3DHover = {
    scale: 1.05,
    rotateX: 10,
    rotateY: 10,
    boxShadow: `0px 20px 30px rgba(0, 0, 0, 0.2)`
  };

  const button3DTap = {
    scale: 0.95,
    rotateX: 0,
    rotateY: 0,
    boxShadow: `0px 10px 15px rgba(0, 0, 0, 0.1)`
  };

  // Navigation handlers
  const handleOrderNow = () => {
    router.push('/menu');
  };

  const handleHowItWorks = () => {
    router.push('/how-it-works');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <section className="relative min-h-screen flex items-center" style={{ background: WHITE }}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-30"
          style={{ background: PINK }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content Section */}
          <div className="relative z-10">
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ color: PINK }}
            >
              Discover Your<br/>
              <span className="text-black">Perfect Meal</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-8 max-w-xl"
            >
              Experience culinary excellence delivered to your doorstep. Order from 1000+ restaurants with just a few clicks.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 mb-8"
              // Preserve 3D space for buttons
              style={{ perspective: 600 }}
            >
              <motion.button
                whileHover={button3DHover}
                whileTap={button3DTap}
                onClick={handleOrderNow}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all"
                style={{ 
                  background: PINK,
                  boxShadow: `0 8px 24px ${PINK}40`,
                  transformStyle: 'preserve-3d'
                }}
              >
                Order Now
                <FiArrowRight className="text-xl" />
              </motion.button>

              <motion.button
                whileHover={button3DHover}
                whileTap={button3DTap}
                onClick={handleHowItWorks}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 transition-all"
                style={{ 
                  borderColor: PINK, 
                  color: PINK,
                  boxShadow: `0 4px 12px ${PINK}20`,
                  background: 'transparent',
                  transformStyle: 'preserve-3d'
                }}
              >
                How It Works
              </motion.button>

              <motion.button
                whileHover={button3DHover}
                whileTap={button3DTap}
                onClick={handleLogin}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 transition-all"
                style={{
                  borderColor: PINK,
                  color: PINK,
                  background: 'transparent',
                  boxShadow: `0 4px 12px ${PINK}20`,
                  transformStyle: 'preserve-3d'
                }}
              >
                Login
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              {['24/7 Delivery', '100% Secure', '5000+ Dishes'].map((text) => (
                <motion.div
                  key={text}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50"
                >
                  <FiCheckCircle className="text-pink-500" />
                  <span className="text-sm font-medium">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image Section */}
          <motion.div
            variants={itemVariants}
            className="relative lg:block hidden"
          >
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-pink-100 to-pink-50"
                style={{ mixBlendMode: 'multiply' }}
              />
              <div className="relative z-10 w-full h-full">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-full h-full"
                >
                  <Image
                    src="/burger.png"
                    alt="Delicious Burger"
                    width={800}
                    height={800}
                    className="object-cover w-full h-full"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile-only Login Button */}
      <motion.div className="lg:hidden fixed bottom-4 left-0 right-0 px-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="w-full py-4 rounded-xl border-2 border-pink-700 text-pink-700 font-bold transition-colors"
        >
          Login
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
