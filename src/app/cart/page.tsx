'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiTrash2, FiMapPin, FiShoppingCart, FiClock, FiCreditCard, FiGift, FiChevronDown } from 'react-icons/fi';

interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  specialInstructions?: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    city: '',
    zipCode: '',
    deliveryInstructions: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [promoCode, setPromoCode] = useState('');
  const [deliveryTime, setDeliveryTime] = useState<number | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const router = useRouter();

  const timeSlots = [
    'ASAP (20-40 mins)',
    '12:00 PM - 12:30 PM',
    '12:30 PM - 1:00 PM',
    '1:00 PM - 1:30 PM',
  ];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const handleQuantityChange = (id: number, action: 'increase' | 'decrease') => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: action === 'increase' ? item.quantity + 1 : Math.max(1, item.quantity - 1)
        };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleSpecialInstructions = (id: number, instructions: string) => {
    const updatedCart = cartItems.map(item => ({
      ...item,
      specialInstructions: item.id === id ? instructions : item.specialInstructions
    }));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const taxes = subtotal * 0.18;
  const total = subtotal + deliveryFee + taxes;

  const handleConfirmOrder = () => {
    if (!deliveryDetails.address.trim() || !deliveryDetails.city.trim()) {
      alert('Please enter your complete delivery details!');
      return;
    }

    const estimatedTime = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    setDeliveryTime(estimatedTime);
    setOrderConfirmed(true);
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl font-bold text-center text-pink-600 mb-10 flex items-center justify-center gap-3"
      >
        <FiShoppingCart className="w-10 h-10" />
        Your Shopping Cart
        <span className="text-lg bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
          {cartItems.length} items
        </span>
      </motion.h1>

      {cartItems.length === 0 && !orderConfirmed ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 text-xl"
        >
          <div className="text-8xl mb-6 text-pink-200">🛒</div>
          <p className="text-2xl font-semibold text-gray-700 mb-4">
            Your cart is waiting for pretty things!
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-6 bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition-all shadow-lg hover:shadow-pink-200 flex items-center gap-2 mx-auto"
          >
            <FiShoppingCart className="w-5 h-5" />
            Start Shopping
          </button>
        </motion.div>
      ) : orderConfirmed ? (
        <OrderConfirmationView 
          deliveryDetails={deliveryDetails}
          deliveryTime={deliveryTime}
          total={total}
          router={router}
        />
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FiShoppingCart className="text-pink-500" />
                Your Selection
              </h2>

              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-pink-50 rounded-xl border border-pink-100"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          width={96} 
                          height={96} 
                          className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg shadow-md border-2 border-pink-200"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-pink-500 hover:text-pink-700 transition-colors"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center gap-4">
                          <div className="flex items-center gap-2 bg-pink-100 rounded-full px-3 py-1">
                            <button 
                              onClick={() => handleQuantityChange(item.id, 'decrease')}
                              className="text-pink-600 hover:text-pink-800"
                            >
                              -
                            </button>
                            <span className="font-medium w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, 'increase')}
                              className="text-pink-600 hover:text-pink-800"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-pink-600 font-bold">
                            ₨{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <div className="mt-3">
                          <textarea
                            placeholder="Special requests"
                            value={item.specialInstructions || ''}
                            onChange={(e) => handleSpecialInstructions(item.id, e.target.value)}
                            className="w-full px-3 py-2 text-black text-sm border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none placeholder:text-gray-500"
                            rows={2}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Delivery Time Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
                <FiClock className="text-pink-500" />
                Delivery Time
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    className={`p-3 text-left rounded-xl border transition-colors ${
                      activeAccordion === `time-${index}` 
                        ? 'border-pink-500 bg-pink-50' 
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                    onClick={() => setActiveAccordion(`time-${index}`)}
                  >
                    <span className="font-medium text-pink-600">{slot}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Summary and Checkout */}
          <div className="space-y-6">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
                📝 Order Summary
              </h3>
              
              <div className="space-y-3 text-pink-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₨{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₨${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (18%)</span>
                  <span>₨{taxes.toFixed(2)}</span>
                </div>
                <hr className="my-2 border-gray-200" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-pink-600">₨{total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            {/* Promo Code */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-4 py-2 text-black border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none placeholder:text-gray-500"
                />
                <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2">
                  <FiGift className="w-5 h-5" />
                  Apply
                </button>
              </div>
            </motion.div>

            {/* Delivery Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
                <FiMapPin className="text-pink-500" />
                Delivery Info
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Street Address"
                  value={deliveryDetails.address}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })}
                  className="w-full px-3 py-2 text-black border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none placeholder:text-gray-500"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={deliveryDetails.city}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, city: e.target.value })}
                  className="w-full px-3 py-2 text-black border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none placeholder:text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={deliveryDetails.zipCode}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, zipCode: e.target.value })}
                  className="w-full px-3 py-2 text-black border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none placeholder:text-gray-500"
                />
                <textarea
                  placeholder="Special delivery notes"
                  value={deliveryDetails.deliveryInstructions}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, deliveryInstructions: e.target.value })}
                  className="w-full px-3 py-2 text-black border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 outline-none placeholder:text-gray-500"
                  rows={3}
                />
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-pink-600 mb-4 flex items-center gap-2">
                <FiCreditCard className="text-pink-500" />
                Payment
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-pink-200 rounded-lg hover:border-pink-300 cursor-pointer text-pink-600">
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={() => setPaymentMethod('credit-card')}
                    className="text-pink-500 focus:ring-pink-500"
                  />
                  Credit/Debit Card
                </label>
                <label className="flex items-center gap-3 p-3 border border-pink-200 rounded-lg hover:border-pink-300 cursor-pointer text-pink-600">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="text-pink-500 focus:ring-pink-500"
                  />
                  PayPal
                </label>
                <label className="flex items-center gap-3 p-3 border border-pink-200 rounded-lg hover:border-pink-300 cursor-pointer text-pink-600">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="text-pink-500 focus:ring-pink-500"
                  />
                  Cash on Delivery
                </label>
              </div>
            </motion.div>

            {/* Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleConfirmOrder}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-pink-200 transition-all flex items-center justify-center gap-2"
            >
              <FiCreditCard className="w-6 h-6" />
              Confirm &amp; Pay ₨{total.toFixed(2)}
            </motion.button>

            {/* Security Assurance */}
            <div className="text-center text-sm text-gray-500 mt-4">
              <p className="flex items-center justify-center gap-2">
                🔒 Secure Payments
              </p>
              <p>SSL Encrypted Checkout</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface OrderConfirmationProps {
  deliveryDetails: {
    address: string;
    city: string;
    zipCode: string;
    deliveryInstructions: string;
  };
  deliveryTime: number | null;
  total: number;
  router: ReturnType<typeof useRouter>;
}

const OrderConfirmationView = ({ deliveryDetails, deliveryTime, total, router }: OrderConfirmationProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8"
  >
    <div className="text-center">
      <div className="text-6xl mb-4">🎀</div>
      <h2 className="text-3xl font-bold text-pink-600 mb-2">Order Confirmed!</h2>
      <p className="text-lg text-gray-600 mb-4">
        Your items will arrive in{' '}
        <span className="font-bold text-pink-600">{deliveryTime} minutes</span>
      </p>
      <div className="bg-white rounded-xl p-6 shadow-md mt-6 text-left border-l-4 border-pink-400">
        <h3 className="text-xl font-bold mb-4">Order Details</h3>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Address:</span> {deliveryDetails.address}
          </p>
          <p>
            <span className="font-semibold">City:</span> {deliveryDetails.city}
          </p>
          <p>
            <span className="font-semibold">Total:</span> ₨{total.toFixed(2)}
          </p>
        </div>
      </div>
      <button
        onClick={() => router.push('/')}
        className="mt-8 bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition-colors flex items-center gap-2 mx-auto"
      >
        Continue Shopping
        <FiChevronDown className="w-5 h-5 transform rotate-90" />
      </button>
    </div>
  </motion.div>
);

export default CartPage;
