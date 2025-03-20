'use client';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon, HeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

// Constants
const CATEGORIES = ['All', 'Combo', 'Dessert', 'Pizza', 'Fast Food'];
const SORT_OPTIONS = ['Default', 'Price: Low-High', 'Price: High-Low', 'Rating'];

interface OfferItem {
  id: number;
  name: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  rating: number;
  description: string;
  timeLeft: number;
  discountPercentage: number;
  isJumbo?: boolean;
  isVeg?: boolean;
  tags?: string[];
}

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1,2,3,4,5,6].map((i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.1 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="relative h-64 bg-gray-200 animate-pulse" />
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
        </div>
      </motion.div>
    ))}
  </div>
);

const OffersPage = () => {
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Default');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const router = useRouter();

  // Scroll Animation
  const { scrollY } = useScroll();
  useEffect(() => scrollY.onChange(y => setIsScrolled(y > 100)), [scrollY]);

  // Processed Offers
  const processedOffers = useMemo(() => {
    return offers
      .filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === 'All' || item.category === selectedCategory)
      )
      .sort((a, b) => {
        switch(sortBy) {
          case 'Price: Low-High': return a.discountedPrice - b.discountedPrice;
          case 'Price: High-Low': return b.discountedPrice - a.discountedPrice;
          case 'Rating': return b.rating - a.rating;
          default: return 0;
        }
      });
  }, [offers, searchQuery, selectedCategory, sortBy]);

  // Wishlist Functionality
  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Add to Cart Functionality with Redirect
  // --- Modified here: now storing a 'price' field so that the cart page shows the correct price
  const handleAddToCart = (item: OfferItem, quantity = 1) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find((i: OfferItem) => i.id === item.id);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...item, quantity, price: item.discountedPrice });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount((prev: number) => prev + quantity);
    // Redirect to cart page after adding item
    router.push('/cart');
  };

  // Quantity Selector Component
  const QuantitySelector = ({ item }: { item: OfferItem }) => {
    const [quantity, setQuantity] = useState(1);
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-pink-100 rounded-full">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 text-pink-600 hover:bg-pink-200 rounded-l-full"
          >
            -
          </button>
          <span className="px-4">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 text-pink-600 hover:bg-pink-200 rounded-r-full"
          >
            +
          </button>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-semibold"
          onClick={() => handleAddToCart(item, quantity)}
        >
          Add
        </motion.button>
      </div>
    );
  };

  useEffect(() => {
    // Updated mockOffers: Added three new jumbo items so that the slider now has 5 images in total.
    const mockOffers: OfferItem[] = [
      {
        id: 1,
        name: 'Mega Family Pack',
        category: 'Combo',
        originalPrice: 2999,
        discountedPrice: 1599,
        image: '/image copy 2.png',
        rating: 4.9,
        description: '2 Large Pizzas + 4 Burgers + 4 Cold Drinks + Desserts',
        timeLeft: 240,
        discountPercentage: 47,
        isJumbo: true,
        isVeg: false,
        tags: ['Family Pack', 'Best Value']
      },
      {
        id: 2,
        name: 'Burger Mania Combo',
        category: 'Combo',
        originalPrice: 899,
        discountedPrice: 499,
        image: '/burger-cheese.png',
        rating: 4.7,
        description: '2 Classic Burgers + Fries + 2 Cold Drinks',
        timeLeft: 180,
        discountPercentage: 45,
        isVeg: true
      },
      {
        id: 3,
        name: 'Lava Cake Special',
        category: 'Dessert',
        originalPrice: 399,
        discountedPrice: 199,
        image: '/image copy 3.png',
        rating: 4.8,
        description: 'Chocolate Lava Cake with Ice Cream Scoop',
        timeLeft: 120,
        discountPercentage: 50,
        tags: ['Sweet Treat']
      },
      {
        id: 4,
        name: 'Pizza Jumbo Deal',
        category: 'Pizza',
        originalPrice: 1299,
        discountedPrice: 799,
        image: '/image copy.png',
        rating: 4.6,
        description: 'XXL Pizza + Garlic Bread + 2 Cold Drinks',
        timeLeft: 300,
        discountPercentage: 38,
        isJumbo: true,
        isVeg: false
      },
      {
        id: 5,
        name: 'Mayo Zinger Roll',
        category: 'Fast Food',
        originalPrice: 299,
        discountedPrice: 149,
        image: '/image copy 4.png',
        rating: 4.6,
        description: 'Crispy Zinger Roll with Mayo & Fries',
        timeLeft: 90,
        discountPercentage: 50,
        isVeg: false,
        tags: ['Spicy', 'New']
      },
      {
        id: 6,
        name: 'Veggie Delight Pizza',
        category: 'Pizza',
        originalPrice: 1099,
        discountedPrice: 699,
        image: '/veggie-pizza.png',
        rating: 4.7,
        description: 'A delicious veggie pizza with fresh ingredients',
        timeLeft: 200,
        discountPercentage: 36,
        isJumbo: true,
        isVeg: true,
        tags: ['Healthy', 'Fresh']
      },
      {
        id: 7,
        name: 'Chicken Fiesta Combo',
        category: 'Combo',
        originalPrice: 1999,
        discountedPrice: 1199,
        image: '/chicken-combo.png',
        rating: 4.8,
        description: 'Chicken burger, wings, and fries combo',
        timeLeft: 220,
        discountPercentage: 40,
        isJumbo: true,
        isVeg: false,
        tags: ['Popular', 'Spicy']
      },
      {
        id: 8,
        name: 'Decadent Chocolate Cake',
        category: 'Dessert',
        originalPrice: 499,
        discountedPrice: 299,
        image: '/sweet-lava.png',
        rating: 4.9,
        description: 'Rich chocolate cake with ganache frosting',
        timeLeft: 150,
        discountPercentage: 40,
        isJumbo: true,
        isVeg: true,
        tags: ['Dessert', 'Chocolate']
      }
    ];

    setTimeout(() => {
      setOffers(mockOffers);
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % processedOffers.filter(item => item.isJumbo).length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [processedOffers]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prev => prev + 1);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m left`;
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center min-h-screen bg-pink-50"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full"
        />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center mb-16 space-y-6 relative overflow-hidden"
          >
            {/* Animated background elements */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-32 -left-32 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50"
            />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-32 -right-32 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-50"
            />

            {/* Animated title */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="text-6xl font-bold font-serif mb-4"
            >
              {Array.from("Sizzling Deals").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 120 }}
                  className="inline-block bg-gradient-to-r from-pink-800 to-pink-600 bg-clip-text text-transparent"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.5 }}
                className="inline-block ml-2"
              >
                🔥
              </motion.span>
            </motion.h1>

            {/* Animated subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl text-pink-500 max-w-2xl mx-auto relative inline-block"
            >
              <span className="relative z-10 px-4">
                Feast on exclusive offers! Limited time only
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute inset-0 bg-pink-120 rounded-full"
                style={{ originX: 0 }}
              />
            </motion.p>

            {/* Animated decorative elements */}
            <motion.div
              initial={{ rotate: -45, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', delay: 0.8 }}
              className="absolute top-0 right-0 -mt-8 -mr-8"
            >
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-pink-600 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="mb-12 grid gap-4 md:flex md:items-center md:justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === cat 
                    ? 'bg-pink-600 text-white' 
                    : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </motion.div>

        <div className="relative h-[600px] w-full overflow-hidden rounded-3xl shadow-2xl mb-16 group">
          <AnimatePresence mode='popLayout'>
            {processedOffers.filter(item => item.isJumbo).map((item, index) => (
              index === activeIndex && (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="absolute inset-0"
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <div className="max-w-2xl">
                        <motion.div
                          initial={{ y: 20 }}
                          animate={{ y: 0 }}
                          className="bg-pink-600 text-xl font-bold px-4 py-1 rounded-full inline-block mb-4"
                        >
                          {item.discountPercentage}% OFF
                        </motion.div>
                        <motion.h2
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-4xl font-bold mb-4 drop-shadow-2xl"
                        >
                          {item.name}
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xl mb-6"
                        >
                          {item.description}
                        </motion.p>
                        <div className="flex items-center gap-6">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold text-lg"
                            onClick={() => handleAddToCart(item)}
                          >
                            Grab Now - ₨{item.discountedPrice}
                          </motion.button>
                          <div className="flex items-center">
                            <StarIcon className="w-6 h-6 text-yellow-400 mr-1" />
                            <span className="text-xl">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          <button
            onClick={() => setActiveIndex(prev => (prev - 1 + processedOffers.filter(item => item.isJumbo).length) % processedOffers.filter(item => item.isJumbo).length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full transition-all"
          >
            <ChevronLeftIcon className="w-8 h-8 text-white" />
          </button>
          <button
            onClick={() => setActiveIndex(prev => (prev + 1) % processedOffers.filter(item => item.isJumbo).length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-3 rounded-full transition-all"
          >
            <ChevronRightIcon className="w-8 h-8 text-white" />
          </button>
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedOffers.filter(item => !item.isJumbo).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group"
              >
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="absolute top-4 left-4 z-20 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:scale-110 transition-all"
                >
                  {wishlist.includes(item.id) ? (
                    <HeartIcon className="w-6 h-6 text-pink-600" />
                  ) : (
                    <HeartOutline className="w-6 h-6 text-gray-400" />
                  )}
                </button>

                {item.isVeg !== undefined && (
                  <div className="absolute top-4 right-16 z-10 p-1 bg-white rounded-full">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      item.isVeg ? 'border-green-600' : 'border-red-600'
                    }`} />
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                  {item.discountPercentage}% OFF
                </div>
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <div className="flex items-center text-white">
                      <StarIcon className="w-5 h-5 text-yellow-400" />
                      <span className="ml-1 font-semibold">{item.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                    <span className="text-sm bg-pink-100 text-pink-600 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-pink-600">
                        ₨{item.discountedPrice}
                      </span>
                      <span className="ml-2 text-gray-400 line-through">
                        ₨{item.originalPrice}
                      </span>
                    </div>
                    <span className="text-sm text-red-600 font-semibold">
                       {formatTime(item.timeLeft - remainingTime)}
                    </span>
                  </div>
                  <QuantitySelector item={item} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;
