"use client";

import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Chef = {
  id: number;
  name: string;
  image: string;
  experience: number;
  rating: number;
  reviews: number;
};

const chefs: Chef[] = [
  {
    id: 1,
    name: "Chef Ahsen",
    image: "/ahsen.png",
    experience: 15,
    rating: 4.9,
    reviews: 220,
  },
  {
    id: 2,
    name: "Chef Abeera",
    image: "/abeera.png",
    experience: 10,
    rating: 4.7,
    reviews: 180,
  },
  {
    id: 3,
    name: "Chef Hasan",
    image: "/hasan.png",
    experience: 12,
    rating: 4.8,
    reviews: 200,
  },
];

const ChefSection = () => {
  const router = useRouter();

  const handleHireClick = (chefId: number) => {
    router.push(`/hire/${chefId}`);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-pink-100 to-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-5xl font-extrabold text-pink-700 mb-12 drop-shadow-xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Meet Our Expert Chefs
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-12">
          {chefs.map((chef) => (
            <motion.div
              key={chef.id}
              className="bg-white p-8 rounded-3xl shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-pink-300 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: chef.id * 0.2 }}
            >
              <div className="relative w-44 h-44 mx-auto mb-4 rounded-full overflow-hidden border-4 border-pink-400 shadow-lg hover:scale-110 transition-all duration-300">
                <Image
                  src={chef.image}
                  alt={chef.name}
                  layout="fill"
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{chef.name}</h3>
              <p className="text-gray-600 mt-1">{chef.experience} Years Experience</p>
              <div className="flex justify-center items-center mt-4">
                <StarIcon className="w-6 h-6 text-yellow-500 animate-bounce" />
                <span className="ml-2 text-lg font-bold text-gray-900">
                  {chef.rating}
                </span>
                <span className="ml-1 text-gray-500">({chef.reviews} reviews)</span>
              </div>
              <motion.button
                className="mt-6 px-8 py-3 bg-pink-500 text-white font-bold rounded-full shadow-md hover:bg-pink-600 transition-all duration-300 hover:shadow-lg hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleHireClick(chef.id)}
              >
                Hire Me
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefSection;
