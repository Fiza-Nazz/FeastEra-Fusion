'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { GiChefToque, GiForkKnifeSpoon } from 'react-icons/gi';
import { useRouter } from 'next/navigation';

const FeastEraLogin = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTerms, setShowTerms] = useState(false);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulated API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.push('/menu');
    } catch {
      setError('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Food Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-200"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              rotate: [0, 180, 360],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <GiForkKnifeSpoon className="text-3xl" />
          </motion.div>
        ))}
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 relative overflow-hidden"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mb-6"
          >
            <GiChefToque className="text-6xl text-pink-600 hover:text-pink-700 transition-colors cursor-pointer" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-lobster">
            FeastEra
          </h1>
          <p className="text-gray-600 text-lg">
            {isLogin ? 'Welcome back, food lover!' : 'Join our culinary journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center p-3 bg-pink-100 text-pink-700 rounded-lg"
            >
              <FiAlertCircle className="mr-2" />
              {error}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center bg-pink-50 rounded-xl px-4 py-3 shadow-inner hover:shadow transition-all">
              <FiMail className="text-pink-600 text-xl" />
              <input
                type="email"
                placeholder="Your best email"
                className="w-full ml-3 bg-transparent outline-none placeholder-pink-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center bg-pink-50 rounded-xl px-4 py-3 shadow-inner hover:shadow transition-all">
              <FiLock className="text-pink-600 text-xl" />
              <input
                type="password"
                placeholder="Secret password"
                className="w-full ml-3 bg-transparent outline-none placeholder-pink-400"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            
            {!isLogin && (
              <div className="mt-3 flex items-center space-x-2">
                <div className="flex-1 h-2 bg-pink-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      passwordStrength >= 4 ? 'bg-green-400' :
                      passwordStrength >= 2 ? 'bg-yellow-400' : 'bg-pink-400'
                    }`}
                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-pink-600">
                  {['Weak', 'Fair', 'Good', 'Strong'][passwordStrength] || 'Weak'}
                </span>
              </div>
            )}
          </motion.div>

          {!isLogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                id="terms"
                className="accent-pink-600"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to FeastEra{' '}
                <button
                  type="button"
                  onClick={() => setShowTerms(!showTerms)}
                  className="text-pink-600 hover:underline"
                >
                  Terms & Conditions
                </button>
              </label>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-pink-600 text-white py-4 rounded-xl font-medium
              hover:bg-pink-700 transition-colors relative overflow-hidden"
            type="submit"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="h-6 w-6 border-4 border-white/30 border-t-white rounded-full mx-auto"
              />
            ) : (
              <span>{isLogin ? 'Let\'s Feast!' : 'Start My Journey'}</span>
            )}
          </motion.button>

          <div className="text-center text-gray-600 mt-6">
            {isLogin ? "New to FeastEra?" : "Already have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-pink-600 hover:text-pink-700 font-medium ml-1 transition-colors"
            >
              {isLogin ? 'Create account' : 'Sign in instead'}
            </button>
          </div>

          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-pink-100"></div>
            <span className="px-4 text-pink-500 text-sm">Or continue with</span>
            <div className="flex-1 border-t border-pink-100"></div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { provider: 'Google', color: '#DB4437', icon: 'G' },
              { provider: 'Apple', color: '#000000', icon: 'A' },
              { provider: 'Facebook', color: '#1877F2', icon: 'F' },
            ].map((item) => (
              <motion.button
                key={item.provider}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center p-3 rounded-xl transition-colors
                  bg-pink-100 hover:bg-pink-200"
                type="button"
              >
                <span className="font-semibold text-xl text-pink-600">
                  {item.icon}
                </span>
              </motion.button>
            ))}
          </div>
        </form>
      </motion.div>

      {/* Terms Modal */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
              <p className="text-gray-600 mb-4">
                By creating an account, you agree to our delicious terms of service...
              </p>
              <button
                onClick={() => setShowTerms(false)}
                className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeastEraLogin;