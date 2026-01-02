import { STORE_NAME_SHORT } from "@/constants/app";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  image: string;
  variant: "pet-store" | "burger-king" | "mcdonalds" | "starbucks" | "lego" | "rivertown" | "red-robin" | "annas-house" | "macys";
  products: Product[];
}

export const businessData: Business[] = [
  {
    id: "pet-store",
    name: STORE_NAME_SHORT,
    description: "Everything your furry, feathered, and finned friends need!",
    image: "/src/assets/pet-store.jpg",
    variant: "pet-store",
    products: [
      { id: "pet-1", name: "Premium Dog Treats", description: "Delicious bacon-flavored treats", price: 5 },
      { id: "pet-2", name: "Interactive Cat Toy", description: "Feather wand with bells", price: 8 },
      { id: "pet-3", name: "Tropical Fish Food", description: "Nutrient-rich flakes", price: 3 },
      { id: "pet-4", name: "Hamster Exercise Wheel", description: "Silent spinner wheel", price: 12 },
      { id: "pet-5", name: "Bird Seed Mix", description: "Premium blend for all birds", price: 6 },
      { id: "pet-6", name: "Pet Grooming Kit", description: "Complete brushing set", price: 15 },
    ]
  },
  {
    id: "burger-king",
    name: "Burger King",
    description: "Have it your way with flame-grilled goodness!",
    image: "/src/assets/burger-king.jpg",
    variant: "burger-king",
    products: [
      { id: "bk-1", name: "Whopper", description: "The king of burgers", price: 7 },
      { id: "bk-2", name: "Chicken Fries", description: "Crispy chicken strips", price: 5 },
      { id: "bk-3", name: "Onion Rings", description: "Golden crispy rings", price: 3 },
      { id: "bk-4", name: "Bacon King", description: "Double beef, double bacon", price: 9 },
      { id: "bk-5", name: "Milkshake", description: "Thick and creamy", price: 4 },
      { id: "bk-6", name: "Kids Meal", description: "Burger, fries, and toy", price: 6 },
    ]
  },
  {
    id: "mcdonalds",
    name: "McDonald's",
    description: "I'm lovin' it! Classic favorites for everyone!",
    image: "/src/assets/mcdonalds.jpg",
    variant: "mcdonalds",
    products: [
      { id: "mc-1", name: "Happy Meal", description: "Nuggets, fries, and surprise toy", price: 6 },
      { id: "mc-2", name: "Big Mac", description: "Two all-beef patties", price: 8 },
      { id: "mc-3", name: "McFlurry", description: "Oreo or M&M flavors", price: 4 },
      { id: "mc-4", name: "Chicken McNuggets", description: "6-piece golden nuggets", price: 5 },
      { id: "mc-5", name: "Apple Pie", description: "Hot and bubbly", price: 2 },
      { id: "mc-6", name: "Fries", description: "World famous golden fries", price: 3 },
    ]
  },
  {
    id: "starbucks",
    name: "Starbucks",
    description: "Your perfect coffee moment awaits!",
    image: "/src/assets/starbucks.jpg",
    variant: "starbucks",
    products: [
      { id: "sb-1", name: "Hot Chocolate", description: "Rich and creamy kids favorite", price: 4 },
      { id: "sb-2", name: "Cake Pops", description: "Colorful bite-sized treats", price: 3 },
      { id: "sb-3", name: "Chocolate Chip Cookies", description: "Warm and gooey", price: 2 },
      { id: "sb-4", name: "Frappuccino", description: "Blended ice drink", price: 5 },
      { id: "sb-5", name: "Muffin", description: "Blueberry or chocolate chip", price: 3 },
      { id: "sb-6", name: "Milk Box", description: "Fresh and cold", price: 2 },
    ]
  },
  {
    id: "lego",
    name: "Lego Store",
    description: "Build your imagination with endless possibilities!",
    image: "/src/assets/lego-store.jpg",
    variant: "lego",
    products: [
      { id: "lego-1", name: "City Fire Station Set", description: "Build and rescue adventures", price: 25 },
      { id: "lego-2", name: "Mini Figures Pack", description: "Collectible characters", price: 5 },
      { id: "lego-3", name: "Build Table Time", description: "30 minutes of building fun", price: 10 },
      { id: "lego-4", name: "Castle Adventure Set", description: "Medieval building fun", price: 30 },
      { id: "lego-5", name: "Vehicle Creator Kit", description: "Build cars, planes, boats", price: 20 },
      { id: "lego-6", name: "Brick Building Mat", description: "Perfect building surface", price: 8 },
    ]
  },
  {
    id: "rivertown",
    name: "RiverTown Crossing",
    description: "The ultimate shopping and dining destination!",
    image: "/src/assets/rivertown.jpg",
    variant: "rivertown",
    products: [
      { id: "rt-1", name: "Kohls Shopping", description: "Clothes, toys, and home goods", price: 20 },
      { id: "rt-2", name: "Toys R Us Adventure", description: "The ultimate toy wonderland", price: 15 },
      { id: "rt-3", name: "Panda Express", description: "Orange chicken and fried rice", price: 8 },
      { id: "rt-4", name: "Chipotle Bowl", description: "Build your own burrito bowl", price: 9 },
      { id: "rt-5", name: "McDonald's at Food Court", description: "Happy meals and fries", price: 6 },
      { id: "rt-6", name: "Food Court Fun", description: "Eat and play area", price: 5 },
    ]
  },
  {
    id: "red-robin",
    name: "Red Robin",
    description: "Yummm! Gourmet burgers and bottomless fun!",
    image: "/src/assets/red-robin.jpg",
    variant: "red-robin",
    products: [
      { id: "rr-1", name: "Red's Tavern Burger", description: "Classic burger with all toppings", price: 12 },
      { id: "rr-2", name: "Mac & Cheese", description: "Creamy and cheesy", price: 7 },
      { id: "rr-3", name: "Cluck-A-Doodle-Doo Sandwich", description: "Crispy chicken sandwich", price: 11 },
      { id: "rr-4", name: "Bottomless Fries", description: "Steak fries - all you can eat", price: 5 },
      { id: "rr-5", name: "Freckled Lemonade", description: "Strawberry lemonade float", price: 4 },
      { id: "rr-6", name: "Ice Cream Sundae", description: "Mountain high sundae", price: 6 },
    ]
  },
  {
    id: "annas-house",
    name: "Anna's House",
    description: "Breakfast and brunch worth waking up for!",
    image: "/src/assets/annas-house.jpg",
    variant: "annas-house",
    products: [
      { id: "ah-1", name: "Pancake Stack", description: "Fluffy buttermilk pancakes", price: 9 },
      { id: "ah-2", name: "Belgian Waffle", description: "Crispy waffle with syrup", price: 10 },
      { id: "ah-3", name: "Veggie Omelet", description: "Eggs with cheese and veggies", price: 11 },
      { id: "ah-4", name: "French Toast", description: "Cinnamon sugar toast", price: 9 },
      { id: "ah-5", name: "Fresh Fruit Bowl", description: "Seasonal fruit mix", price: 7 },
      { id: "ah-6", name: "Hot Chocolate", description: "Rich and creamy", price: 4 },
    ]
  },
  {
    id: "macys",
    name: "Macy's",
    description: "The Fragrance Destination - Smell amazing!",
    image: "/src/assets/macys.jpg",
    variant: "macys",
    products: [
      { id: "mc-1", name: "Perfume Sampler", description: "Try 5 different scents", price: 15 },
      { id: "mc-2", name: "Cologne Collection", description: "Fresh and clean scents", price: 18 },
      { id: "mc-3", name: "Body Spray Set", description: "Fun fruity scents", price: 10 },
      { id: "mc-4", name: "Scented Candle", description: "Make your room smell nice", price: 12 },
      { id: "mc-5", name: "Bath Gift Set", description: "Soap, lotion, and bubbles", price: 20 },
      { id: "mc-6", name: "Fragrance Workshop", description: "Create your own scent", price: 25 },
    ]
  }
];

export const superComboItems = [
  { id: "combo-1", name: "Dog Treats", price: 5, business: STORE_NAME_SHORT, variant: "pet-store" as const },
  { id: "combo-2", name: "Whopper Meal", price: 7, business: "Burger King", variant: "burger-king" as const },
  { id: "combo-3", name: "Happy Meal", price: 6, business: "McDonald's", variant: "mcdonalds" as const },
  { id: "combo-4", name: "Hot Chocolate", price: 4, business: "Starbucks", variant: "starbucks" as const },
  { id: "combo-5", name: "Mini Figures", price: 5, business: "Lego Store", variant: "lego" as const },
];