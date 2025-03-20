'use client';
import { motion } from 'framer-motion';
import { FiPlus, FiMinus, FiCheck, FiStar, FiClock, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const OrderPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState({
    extraCheese: false,
    spicy: false,
    extraSauce: false
  });

  const order = {
    id: params.id || 'default',
    name: 'Premium Burger Meal',
    price: 15.99,
    description: 'Juicy beef patty with fresh vegetables and special sauce',
    image: '/burger.png',
    rating: 4.8,
    preparationTime: 20,
    calories: 650
  };

  // Calculate additional cost based on selected customizations
  const customizationCost = 
    (customizations.extraCheese ? 1.50 : 0) +
    (customizations.spicy ? 0.50 : 0) +
    (customizations.extraSauce ? 0.75 : 0);

  // Compute total cost with customizations for given quantity
  const totalCost = ((order.price + customizationCost) * quantity).toFixed(2);

  const handleCustomization = (key: keyof typeof customizations) => {
    setCustomizations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddToCart = () => {
    // Retrieve existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // Create an item object with order details, quantity and customizations
    const cartItem = {
      ...order,
      quantity,
      customizations,
      totalCost: parseFloat(totalCost)
    };

    // Check if the same item with identical customizations already exists in the cart
    interface Customizations {
      extraCheese: boolean;
      spicy: boolean;
      extraSauce: boolean;
    }

    interface CartItem {
      id: string;
      name: string;
      price: number;
      description: string;
      image: string;
      rating: number;
      preparationTime: number;
      calories: number;
      quantity: number;
      customizations: Customizations;
      totalCost: number;
    }

    const existingIndex = cart.findIndex((item: CartItem) => 
      item.id === order.id && JSON.stringify(item.customizations) === JSON.stringify(customizations)
    );

    if (existingIndex !== -1) {
      // Update existing item quantity and recalculate total cost
      cart[existingIndex].quantity += quantity;
      const newTotalCost = ((order.price + customizationCost) * cart[existingIndex].quantity).toFixed(2);
      cart[existingIndex].totalCost = parseFloat(newTotalCost);
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to cart!');
    // Redirect to cart page
    router.push('/cart');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="mb-6 flex items-center text-pink-600 hover:text-pink-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Back
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid md:grid-cols-2 gap-12">
            {/* Image Section */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={order.image}
                alt={order.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>

            {/* Details Section */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">{order.name}</h1>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  <FiStar className="text-xl" />
                  <span className="font-medium">{order.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <FiClock className="text-xl" />
                  <span>{order.preparationTime} mins</span>
                </div>
                <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                  {order.calories} kcal
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {order.description}
              </p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 bg-pink-100 rounded-full px-4 py-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-pink-200 rounded-full"
                  >
                    <FiMinus />
                  </button>
                  <span className="text-xl font-medium w-8 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-pink-200 rounded-full"
                  >
                    <FiPlus />
                  </button>
                </div>
                <span className="text-3xl font-bold text-pink-600">
                  ₨{totalCost}
                </span>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Customizations</h2>
                <div className="space-y-3">
                  {Object.entries(customizations).map(([key, value]) => (
                    <label 
                      key={key}
                      className="flex items-center gap-3 p-3 hover:bg-pink-50 rounded-xl cursor-pointer"
                      onClick={() => handleCustomization(key as keyof typeof customizations)}
                    >
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center 
                        ${value ? 'bg-pink-600 border-pink-600' : 'border-gray-300'}`}
                      >
                        {value && <FiCheck className="text-white" />}
                      </div>
                      <span className="capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                      {key === 'extraCheese' && <span className="ml-auto text-gray-500">+₨1.50</span>}
                      {key === 'spicy' && <span className="ml-auto text-gray-500">+₨0.50</span>}
                      {key === 'extraSauce' && <span className="ml-auto text-gray-500">+₨0.75</span>}
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full bg-pink-600 text-white py-4 rounded-xl font-medium hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiShoppingCart className="text-xl" />
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderPage;
