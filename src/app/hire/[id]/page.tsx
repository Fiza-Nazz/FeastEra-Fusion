"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

type Chef = {
  id: number;
  name: string;
  image: string;
  experience: number;
  rating: number;
  reviews: number;
  bio: string;
  specialties: string[];
};

const chefs: Chef[] = [
  {
    id: 1,
    name: "Chef Ahsen",
    image: "/ahsen.png",
    experience: 15,
    rating: 4.9,
    reviews: 220,
    bio: "A master chef with expertise in Italian and Mediterranean cuisine.",
    specialties: ["Italian", "Mediterranean", "Seafood"],
  },
  {
    id: 2,
    name: "Chef Abeera",
    image: "/abeera.png",
    experience: 10,
    rating: 4.7,
    reviews: 180,
    bio: "A passionate chef known for crafting delicious Middle Eastern and fusion dishes.",
    specialties: ["Middle Eastern", "Fusion", "Vegetarian"],
  },
  {
    id: 3,
    name: "Chef Hasan ",
    image: "/hasan.png",
    experience: 12,
    rating: 4.8,
    reviews: 200,
    bio: "An expert in Asian cuisine with a flair for exotic flavors and spices.",
    specialties: ["Asian", "Thai", "BBQ"],
  },
];

const HirePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const chef = chefs.find((c) => c.id === Number(id));

  if (!chef) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl font-bold text-red-600">Chef Not Found</h2>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-md hover:bg-pink-600 transition-all duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-gradient-to-r from-white to-pink-100">
      <motion.div
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-3xl text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-44 h-44 mx-auto mb-6 rounded-full overflow-hidden border-4 border-pink-400 shadow-lg">
          <Image src={chef.image} alt={chef.name} layout="fill" className="object-cover" />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900">{chef.name}</h1>
        <p className="text-gray-600 mt-2">{chef.experience} Years of Experience</p>
        <div className="flex justify-center items-center mt-4">
          <StarIcon className="w-6 h-6 text-yellow-500" />
          <span className="ml-2 text-lg font-bold text-gray-900">{chef.rating}</span>
          <span className="ml-1 text-gray-500">({chef.reviews} reviews)</span>
        </div>
        <p className="mt-4 text-gray-700">{chef.bio}</p>
        <h3 className="mt-6 text-lg font-semibold text-pink-600">Specialties:</h3>
        <ul className="mt-2 flex justify-center space-x-3">
          {chef.specialties.map((specialty, index) => (
            <li
              key={index}
              className="bg-pink-200 text-pink-900 px-4 py-2 rounded-full text-sm font-medium"
            >
              {specialty}
            </li>
          ))}
        </ul>
        <motion.button
          className="mt-6 px-8 py-3 bg-pink-500 text-white font-bold rounded-full shadow-md hover:bg-pink-600 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => alert(`Booking request sent for ${chef.name}!`)}
        >
          Hire {chef.name}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HirePage;
