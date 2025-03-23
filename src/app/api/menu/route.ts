import { NextResponse } from 'next/server';

export async function GET() {
  const menu_items = [
    {
      id: 1,
      name: "Classic Cheeseburger",
      category: "Burgers",
      price: 299,
      image: "/burger-cheese.png",
      rating: 4.7,
      description: "Juicy beef patty with melted cheddar cheese, fresh lettuce and special sauce"
    },
    {
      id: 2,
      name: "BBQ Bacon Burger",
      category: "Burgers",
      price: 349,
      image: "/burger-bbq.png",
      rating: 4.8,
      description: "Smoky BBQ sauce, crispy bacon and caramelized onions"
    },
    {
      id: 3,
      name: "Mushroom Swiss Burger",
      category: "Burgers",
      price: 329,
      image: "/burger-mushroom.png",
      rating: 4.6,
      description: "Sautéed mushrooms and Swiss cheese on grilled beef"
    },
    {
      id: 4,
      name: "Spicy Chicken Burger",
      category: "Burgers",
      price: 279,
      image: "/burger-chicken.png",
      rating: 4.5,
      description: "Crispy chicken fillet with jalapeños and chipotle mayo"
    },
    {
      id: 5,
      name: "Veggie Supreme Burger",
      category: "Burgers",
      price: 259,
      image: "/burger-veggie.png",
      rating: 4.4,
      description: "Grilled vegetable patty with hummus and tahini"
    },
    {
      id: 6,
      name: "Double Patty Monster",
      category: "Burgers",
      price: 399,
      image: "/double-pettie.png",
      rating: 4.9,
      description: "Two beef patties with double cheese and bacon"
    },
    // Pizzas
    {
      id: 7,
      name: "Margherita Classic",
      category: "Pizzas",
      price: 449,
      image: "/pizza-margherita.png",
      rating: 4.8,
      description: "Fresh tomatoes, mozzarella and basil on thin crust"
    },
    {
      id: 8,
      name: "Pepperoni Feast",
      category: "Pizzas",
      price: 499,
      image: "/pizza-pepperoni.png",
      rating: 4.9,
      description: "Extra pepperoni with triple cheese blend"
    },
    {
      id: 9,
      name: "Tandoori Chicken Pizza",
      category: "Pizzas",
      price: 529,
      image: "/pizza-tandoori.png",
      rating: 4.7,
      description: "Spicy tandoori chicken with onions and coriander"
    },
    {
      id: 10,
      name: "Veggie Supreme",
      category: "Pizzas",
      price: 479,
      image: "/pizza-veggie.png",
      rating: 4.6,
      description: "Mixed bell peppers, olives and mushrooms"
    },
    {
      id: 11,
      name: "Hawaiian Paradise",
      category: "Pizzas",
      price: 489,
      image: "/pizza-hawaiian.png",
      rating: 4.5,
      description: "Ham and pineapple with mozzarella"
    },
    {
      id: 12,
      name: "Truffle Mushroom",
      category: "Pizzas",
      price: 599,
      image: "/pizza-truffle.png",
      rating: 4.8,
      description: "Truffle oil, wild mushrooms and parmesan"
    },
    // Drinks
    {
      id: 13,
      name: "Classic Mojito",
      category: "Drinks",
      price: 199,
      image: "/drink-mojito.png",
      rating: 4.6,
      description: "Fresh lime mint cooler with soda"
    },
    {
      id: 14,
      name: "Strawberry Shake",
      category: "Drinks",
      price: 179,
      image: "/drink-strawberry.png",
      rating: 4.7,
      description: "Creamy milkshake with fresh strawberries"
    },
    {
      id: 15,
      name: "Iced Caramel Latte",
      category: "Drinks",
      price: 229,
      image: "/drink-latte.png",
      rating: 4.8,
      description: "Cold brew coffee with caramel syrup"
    },
    {
      id: 16,
      name: "Tropical Smoothie",
      category: "Drinks",
      price: 209,
      image: "/drink-smoothie.png",
      rating: 4.5,
      description: "Mango, pineapple and yogurt blend"
    },
    {
      id: 17,
      name: "Lemon Iced Tea",
      category: "Drinks",
      price: 149,
      image: "/drink-lemontea.png",
      rating: 4.4,
      description: "Freshly brewed black tea with lemon"
    },
    {
      id: 18,
      name: "Virgin Pina Colada",
      category: "Drinks",
      price: 249,
      image: "/drink-pina.png",
      rating: 4.7,
      description: "Pineapple and coconut milk mocktail"
    },
    // Sweets
    {
      id: 19,
      name: "Chocolate Lava Cake",
      category: "Sweets",
      price: 179,
      image: "/sweet-lava.png",
      rating: 4.9,
      description: "Warm chocolate cake with molten center"
    },
    {
      id: 20,
      name: "Tiramisu Classico",
      category: "Sweets",
      price: 199,
      image: "/sweet-tiramisu.png",
      rating: 4.8,
      description: "Layered coffee-flavored Italian dessert"
    },
    {
      id: 21,
      name: "Red Velvet Cupcake",
      category: "Sweets",
      price: 129,
      image: "/sweet-redvelvet.png",
      rating: 4.7,
      description: "Cream cheese frosting on moist cake"
    },
    {
      id: 22,
      name: "Gulab Jamun",
      category: "Sweets",
      price: 99,
      image: "/sweet-gulabjamun.png",
      rating: 4.6,
      description: "Golden fried dumplings in sugar syrup"
    },
    {
      id: 23,
      name: "Mango Mousse",
      category: "Sweets",
      price: 159,
      image: "/sweet-mango.png",
      rating: 4.8,
      description: "Fresh mango puree with whipped cream"
    },
    {
      id: 24,
      name: "Nutella Pancakes",
      category: "Sweets",
      price: 209,
      image: "/sweet-nutella.png",
      rating: 4.9,
      description: "Fluffy pancakes with Nutella drizzle"
    },
    // Rolls
    {
      id: 25,
      name: "Chicken Spring Roll",
      category: "Rolls",
      price: 189,
      image: "/roll-spring.png",
      rating: 4.6,
      description: "Crispy rolls with minced chicken filling"
    },
    {
      id: 26,
      name: "Paneer Kathi Roll",
      category: "Rolls",
      price: 169,
      image: "/roll-paneer.png",
      rating: 4.7,
      description: "Grilled cottage cheese with spices"
    },
    {
      id: 27,
      name: "Sushi California Roll",
      category: "Rolls",
      price: 299,
      image: "/roll-sushi.png",
      rating: 4.8,
      description: "Crab stick, avocado and cucumber"
    },
    {
      id: 28,
      name: "Beef Shawarma",
      category: "Rolls",
      price: 249,
      image: "/roll-shawarma.png",
      rating: 4.7,
      description: "Marinated beef with garlic sauce"
    },
    {
      id: 29,
      name: "Veg Frankie Roll",
      category: "Rolls",
      price: 139,
      image: "/roll-frankie.png",
      rating: 4.5,
      description: "Mixed vegetables with tangy sauces"
    },
    {
      id: 30,
      name: "Cheese Garlic Roll",
      category: "Rolls",
      price: 179,
      image: "/roll-garlic.png",
      rating: 4.6,
      description: "Mozzarella stuffed garlic bread rolls"
    }
  ];

  return NextResponse.json(menu_items);
}
