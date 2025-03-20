'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiShoppingCart, FiSearch, FiChevronDown, FiX, FiMenu } from 'react-icons/fi';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
}

interface StaggerVariants {
  hidden: { opacity: number; y: number };
  visible: (i: number) => { opacity: number; y: number; transition: { delay: number } };
}

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]);

  // Color scheme
  const PINK = '#FF007A';
  const WHITE = '#FFFFFF';

  const menuItems = [
    { 
      name: 'Restaurants', 
      subItems: ['Fast Food', 'Fine Dining', 'Cafes', 'Bakeries'],
      icon: '🍔'
    },
    { 
      name: 'Cuisines', 
      subItems: ['Italian', 'Chinese', 'Mexican', 'Japanese'],
      icon: '🌍'
    },
    { 
      name: 'Offers', 
      subItems: ['Daily Deals', 'Combos', 'Family Packs'],
      icon: '🎁'
    },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch menu items from Flask backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu');
        const data = await response.json();
        setAllMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenuItems();
  }, []);

  // Search functionality with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim()) {
        const results = allMenuItems.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, allMenuItems]);

  const staggerVariants: StaggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    }),
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-xl' : ''}`} style={{ background: WHITE }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
        <motion.div 
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  className="relative group"
  whileHover={{ scale: 1.05 }}
>
  <Link href="/" className="relative z-10 flex items-center gap-2">
    {/* Chef Cap Sticker */}
    <motion.div
      className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center shadow-lg"
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <span className="text-2xl">👩‍🍳</span>
      <div className="absolute -top-1 -right-2 w-5 h-5 bg-pink-300 rounded-full" />
    </motion.div>

    {/* Text Logo */}
    <div className="flex flex-col relative">
      <span className="text-4xl font-bold bg-gradient-to-r from-[#FF007A] to-[#FF4DA6] bg-clip-text text-transparent 
                      font-['Bebas_Neue'] tracking-wider drop-shadow-sm">
        FEASTERA
      </span>
      <span className="text-xs text-pink-400 -mt-1 font-medium"></span>
      
      {/* Accent Element */}
      <motion.div
        className="absolute -right-4 -top-2"
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-4 h-4 bg-pink-300 rounded-full" />
      </motion.div>
    </div>
  </Link>
</motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            <LayoutGroup>
              {menuItems.map((item) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  onHoverStart={() => setActiveCategory(item.name)}
                  onHoverEnd={() => setActiveCategory(null)}
                >
                  <motion.button
                    className="flex items-center gap-2 px-4 py-3 rounded-xl transition-colors"
                    style={{ color: activeCategory === item.name ? WHITE : PINK }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                    <FiChevronDown className={`transition-transform ${activeCategory === item.name ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {activeCategory === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white shadow-2xl rounded-2xl p-4 border border-pink-50"
                      >
                        {item.subItems.map((sub, i) => (
                          <motion.div
                            key={sub}
                            variants={staggerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            custom={i}
                          >
                            <Link
                              href="#"
                              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-pink-50 transition-colors"
                              style={{ color: PINK }}
                            >
                              <div className="w-2 h-2 rounded-full bg-current" />
                              {sub}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </LayoutGroup>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Search Bar with Results */}
            <motion.div 
              className="hidden lg:block relative"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center rounded-full bg-white shadow-sm border border-pink-200">
                <input
                  type="text"
                  placeholder="Search food or restaurants..."
                  className="w-72 px-6 py-3 bg-transparent focus:outline-none placeholder-pink-400"
                  style={{ color: PINK }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="mr-4" style={{ color: PINK }} />
              </div>

              {/* Search Results Dropdown */}
              <AnimatePresence>
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 w-full mt-2 bg-white shadow-xl rounded-2xl overflow-hidden z-50"
                  >
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.map(item => (
                        <Link
                          key={item.id}
                          href={`/product/${item.id}`}
                          className="flex items-center gap-4 p-4 hover:bg-pink-50 border-b border-pink-100"
                        >
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            width={64}
                            height={64}
                            className="object-contain rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold" style={{ color: PINK }}>
                              {item.name}
                            </h4>
                            <p className="text-sm text-pink-300">{item.category}</p>
                            <p className="text-lg font-bold mt-1" style={{ color: PINK }}>
                              Rs {item.price.toLocaleString()}
                            </p>
                          </div>
                        </Link>
                      ))}
                      {searchResults.length === 0 && (
                        <div className="p-6 text-center text-pink-300">
                          No items found for &quot;{searchQuery}&quot;
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Cart */}
            <motion.button 
              className="relative p-2"
              style={{ color: PINK }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/cart')}
            >
              <FiShoppingCart className="text-2xl" />
              <motion.span 
                className="absolute -top-2 -right-2 rounded-full w-6 h-6 text-xs flex items-center justify-center bg-pink-500 text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {cartCount}
              </motion.span>
            </motion.button>

            {/* Auth Button */}
            <div className="hidden lg:flex ml-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/login"
                  className="px-8 py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all"
                  style={{ 
                    background: PINK,
                    boxShadow: '0 4px 6px rgba(255, 0, 122, 0.2)',
                    minWidth: '120px',
                    textAlign: 'center'
                  }}
                >
                  Login
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
              style={{ color: PINK }}
              whileHover={{ scale: 1.1 }}
            >
              {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-white border-t border-pink-100"
            >
              <div className="p-4">
                {/* Mobile Search */}
                <div className="mb-6">
                  <div className="flex items-center rounded-full bg-white border border-pink-200">
                    <input
                      type="text"
                      placeholder="Search food or restaurants..."
                      className="w-full px-6 py-3 bg-transparent focus:outline-none placeholder-pink-400"
                      style={{ color: PINK }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FiSearch className="mr-4" style={{ color: PINK }} />
                  </div>
                  
                  {/* Mobile Search Results */}
                  <AnimatePresence>
                    {searchQuery && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 max-h-60 overflow-y-auto"
                      >
                        {searchResults.map(item => (
                          <Link key={item.id} href={`/product/${item.id}`} className="flex items-center gap-4 p-4 hover:bg-pink-50 border-b border-pink-100">
                            <Image 
                              src={item.image} 
                              alt={item.name} 
                              width={48}
                              height={48}
                              className="object-contain"
                            />
                            <div>
                              <h4 className="font-medium" style={{ color: PINK }}>
                                {item.name}
                              </h4>
                              <p className="text-sm text-pink-300">Rs {item.price.toLocaleString()}</p>
                            </div>
                          </Link>
                        ))}
                        {searchResults.length === 0 && (
                          <div className="p-4 text-center text-pink-300">
                            No results found
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Menu Items */}
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.name} className="border-b border-pink-50 pb-4">
                      <div className="flex items-center gap-3 text-xl" style={{ color: PINK }}>
                        <span>{item.icon}</span>
                        {item.name}
                      </div>
                      <div className="mt-2 pl-8 space-y-2">
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub}
                            href="#"
                            className="block py-2 text-pink-500 hover:text-pink-700"
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Auth Button */}
                <div className="mt-8 w-full">
                  <Link
                    href="/login"
                    className="block w-full py-4 px-8 text-center rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all"
                    style={{ 
                      background: PINK,
                      boxShadow: '0 4px 6px rgba(255, 0, 122, 0.2)'
                    }}
                  >
                    Login
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;