"use client";
import { useState } from "react";
import Image from "next/image";

import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const recipes = [
  {
    id: 1,
    name: "Biryani",
    image: "/biryani.png",
    ingredients: [
      "2 cups basmati rice",
      "500g chicken",
      "2 onions (sliced)",
      "1 cup yogurt",
      "2 tomatoes (chopped)",
      "Spices (cumin, coriander, garam masala, salt, chili)"
    ],
    steps: [
      "Soak rice for 30 minutes.",
      "Sauté onions until golden brown.",
      "Add chicken, tomatoes, and spices, and cook until tender.",
      "Layer chicken and rice, then cook on low heat.",
      "Serve hot with raita."
    ]
  },
  {
    id: 2,
    name: "Chicken Karahi",
    image: "/karahi.png",
    ingredients: [
      "500g chicken",
      "2 tomatoes (pureed)",
      "1 onion (chopped)",
      "1/2 cup oil",
      "Spices (garlic, ginger, salt, red chili, garam masala)"
    ],
    steps: [
      "Heat oil and sauté garlic and ginger.",
      "Add chicken and cook until golden brown.",
      "Add tomato puree and spices, cook until oil separates.",
      "Garnish with fresh coriander and serve hot."
    ]
  },
  {
    id: 3,
    name: "Nihari",
    image: "/nihari.png",
    ingredients: ["1kg beef shank", "3 onions (fried)", "1 cup yogurt", "Nihari spices", "Ghee for cooking"],
    steps: ["Cook beef with nihari spices and onions.", "Simmer for 6 hours.", "Garnish with ginger and serve with naan."]
  },
  {
    id: 4,
    name: "Daleem",
    image: "/daleem.png",
    ingredients: ["1kg beef", "2 cups mixed lentils", "Onions, spices, and wheat grains"],
    steps: ["Cook beef with lentils and spices.", "Blend and slow-cook for 3 hours.", "Garnish with fried onions and ginger."]
  },
  {
    id: 5,
    name: "Paya",
    image: "/paya.png",
    ingredients: ["4 trotters", "Onions, garlic, ginger", "Paya spices"],
    steps: ["Boil trotters for 6 hours.", "Cook with onions and spices.", "Serve with naan."]
  },
  {
    id: 6,
    name: "Chapli Kabab",
    image: "/chapli.png",
    ingredients: ["500g minced beef", "Tomatoes, coriander, flour, spices"],
    steps: ["Mix all ingredients.", "Shape into patties.", "Fry until crispy and serve."]
  },
  {
    id: 7,
    name: "Sajji",
    image: "/sajji.png",
    ingredients: ["Whole chicken", "Salt, lemon, spices"],
    steps: ["Marinate chicken.", "Roast over charcoal.", "Serve with rice."]
  },
  {
    id: 8,
    name: "Shami Kabab",
    image: "/shami.png",
    ingredients: ["500g beef", "Lentils, garlic, ginger, spices"],
    steps: ["Boil beef with lentils and spices.", "Blend and shape into patties.", "Fry and serve."]
  },
  {
    id: 9,
    name: "Daal Chawal",
    image: "/daal.png",
    ingredients: ["1 cup lentils", "1 onion, garlic, ginger", "Spices, rice"],
    steps: ["Cook lentils with spices.", "Serve with steamed rice."]
  },

];

interface Recipe {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  steps: string[];
}

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:scale-105 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Image src={recipe.image} alt={recipe.name} width={500} height={256} className="w-full h-64 object-cover rounded-md" />
      <h2 className="text-xl font-bold mt-4">{recipe.name}</h2>
      <p className="text-gray-600">{expanded ? "Ingredients & Steps" : "Click to expand..."}</p>
      {expanded && (
        <div className="mt-3">
          <h3 className="text-lg font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          <h3 className="text-lg font-semibold mt-3">Steps:</h3>
          <ul className="list-decimal list-inside text-gray-700">
            {recipe.steps.map((step, index) => <li key={index}>{step}</li>)}
          </ul>
        </div>
      )}
      <button className="mt-4 py-2 px-4 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-all" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Read Less" : "Read More"}
      </button>
      <div className="flex gap-3 mt-4 text-pink-500">
        <FaFacebook size={24} className="cursor-pointer hover:text-pink-700" />
        <FaInstagram size={24} className="cursor-pointer hover:text-pink-700" />
        <FaWhatsapp size={24} className="cursor-pointer hover:text-pink-700" />
      </div>
    </motion.div>
  );
};

const RecipePage = () => (
  <section className="min-h-screen bg-gray-100 py-10 px-4 md:px-8">
    <motion.h1 className="text-2xl font-bold text-center text-pink-600 mb-19" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      FeastEra Best Recipes 🍛
    </motion.h1>
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
    </div>
  </section>
);

export default RecipePage;