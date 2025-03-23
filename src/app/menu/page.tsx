'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiShoppingCart, FiClock, FiHeart, FiX } from 'react-icons/fi';
import { GiForkKnifeSpoon } from 'react-icons/gi';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  calories?: number;
}

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Updated to use Next.js API Route
        const response = await fetch('/api/menu');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setMenuItems(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch menu');
        setLoading(false);
      }
    };
    fetchData();
    
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((i: MenuItem) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setToastMessage(`${item.name} added to cart!`);
    setTimeout(() => setToastMessage(null), 3000);
    router.push('/cart'); // Redirection added here
  };

  const toggleFavorite = (itemId: number) => {
    const newFavorites = favorites.includes(itemId)
      ? favorites.filter(id => id !== itemId)
      : [...favorites, itemId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-16 w-16 border-4 border-pink-200 border-t-pink-500 rounded-full"
        />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <GiForkKnifeSpoon className="text-6xl text-pink-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Kitchen Closed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
            >
              <FiShoppingCart className="text-lg" />
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl max-w-md w-full p-6 relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-pink-500"
                >
                  <FiX className="text-2xl" />
                </button>
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  width={500}
                  height={256}
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
                <h2 className="text-2xl font-bold mb-2">{selectedItem.name}</h2>
                <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-pink-500">₨{selectedItem.price}</span>
                  <button
                    className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 flex items-center gap-2"
                    onClick={() => {
                      handleAddToCart(selectedItem);
                      setSelectedItem(null);
                    }}
                  >
                    <FiShoppingCart className="text-lg" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-pink-500 mb-4 font-great-vibes">
            FeastEra
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800">Our Special Menu</h2>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-1 bg-pink-500 rounded-full" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleFavorite(item.id)}
                className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full shadow-sm"
              >
                <FiHeart
                  className={`text-lg ${
                    favorites.includes(item.id)
                      ? 'text-red-500 fill-current'
                      : 'text-gray-600'
                  }`}
                />
              </motion.button>

              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedItem(item)}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4">
                  <h2 className="text-2xl font-bold text-white">{item.name}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
                      {item.category}
                    </span>
                    {item.calories && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                        {item.calories} kcal
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(item.rating) ? 'fill-current' : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({item.rating.toFixed(1)})
                  </span>
                  <div className="flex items-center text-gray-500">
                    <FiClock className="mr-1" />
                    <span className="text-sm">20-25 mins</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-between items-center"
                >
                  <span className="text-2xl font-bold text-pink-500">₨{item.price}</span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 flex items-center gap-2 transition-colors text-sm"
                    onClick={() => handleAddToCart(item)}
                  >
                    <FiShoppingCart className="text-lg" />
                    Add to Cart
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        .font-great-vibes {
          font-family: 'Great Vibes', cursive;
        }
      `}</style>
    </div>
  );
};

export default MenuPage;
