const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('../config/db');
const Product = require('../models/Product');

const products = [
  { 
    name: 'Classic White T-Shirt', 
    description: 'Soft cotton tee', 
    price: 399, 
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', 
    category: 'Men', 
    sizes: ['S','M','L','XL'] 
  },
  { 
    name: 'Denim Jacket', 
    description: 'Stylish denim jacket', 
    price: 2499, 
    image: 'https://images.unsplash.com/photo-1530041539828-114de669390e', 
    category: 'Men', 
    sizes: ['M','L','XL'] 
  },
  { 
    name: 'Blue Jeans', 
    description: 'Slim fit jeans', 
    price: 1199, 
    image: 'https://images.unsplash.com/photo-1495121605193-b116b5b09a57', 
    category: 'Men', 
    sizes: ['S','M','L','XL'] 
  },
  { 
    name: 'Floral Dress', 
    description: 'Summer floral dress', 
    price: 1599, 
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c', 
    category: 'Women', 
    sizes: ['S','M','L'] 
  },
  { 
    name: 'Black Hoodie', 
    description: 'Fleece hoodie', 
    price: 999, 
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246', 
    category: 'Men', 
    sizes: ['M','L','XL'] 
  },
  { 
    name: 'Leather Jacket Women', 
    description: 'Cropped leather jacket', 
    price: 4999, 
    image: 'https://images.unsplash.com/photo-1520975918318-3f72c802fd47', 
    category: 'Women', 
    sizes: ['S','M','L'] 
  },
  { 
    name: 'Kids Tee', 
    description: 'Comfort tee for kids', 
    price: 299, 
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c', 
    category: 'Kids', 
    sizes: ['S','M'] 
  },
  { 
    name: 'Kids Shorts', 
    description: 'Cool summer shorts', 
    price: 399, 
    image: 'https://images.unsplash.com/photo-1520975918318-3f72c802fd47', 
    category: 'Kids', 
    sizes: ['S','M'] 
  },
  { 
    name: 'Formal Shirt', 
    description: 'Office shirt', 
    price: 899, 
    image: 'https://images.unsplash.com/photo-1520975918318-3f72c802fd47', 
    category: 'Men', 
    sizes: ['M','L','XL'] 
  },
  { 
    name: 'Pleated Skirt', 
    description: 'Chic skirt', 
    price: 799, 
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246', 
    category: 'Women', 
    sizes: ['S','M','L'] 
  },
  { 
    name: 'Athletic Shorts', 
    description: 'Sports shorts', 
    price: 499, 
    image: 'https://images.unsplash.com/photo-1607345366925-6e4fd20aef72', 
    category: 'Men', 
    sizes: ['S','M','L'] 
  },
  { 
    name: 'Striped Polo', 
    description: 'Casual polo', 
    price: 599, 
    image: 'https://images.unsplash.com/photo-1520975918318-3f72c802fd47', 
    category: 'Men', 
    sizes: ['M','L','XL'] 
  },
  { 
    name: 'Maxi Dress', 
    description: 'Beach maxi', 
    price: 1299, 
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c', 
    category: 'Women', 
    sizes: ['S','M','L'] 
  },
  { 
    name: 'Knitted Sweater', 
    description: 'Warm sweater', 
    price: 1599, 
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', 
    category: 'Women', 
    sizes: ['M','L'] 
  },
  { 
    name: 'Bomber Jacket', 
    description: 'Light bomber', 
    price: 2999, 
    image: 'https://images.unsplash.com/photo-1520975918318-3f72c802fd47', 
    category: 'Men', 
    sizes: ['M','L','XL'] 
  },
  { 
    name: 'Cargo Pants', 
    description: 'Utility pants', 
    price: 1399, 
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c', 
    category: 'Men', 
    sizes: ['M','L','XL'] 
  },
  { 
    name: 'Summer Romper', 
    description: 'Casual romper', 
    price: 899, 
    image: 'https://images.unsplash.com/photo-1520975918318-3f72c802fd47', 
    category: 'Women', 
    sizes: ['S','M'] 
  },
  { 
    name: 'Denim Skirt Kids', 
    description: 'Kids denim skirt', 
    price: 499, 
    image: 'https://images.unsplash.com/photo-1520975918318-3f72c802fd47', 
    category: 'Kids', 
    sizes: ['S','M'] 
  },
  { 
    name: 'Trench Coat', 
    description: 'Classic coat', 
    price: 3999, 
    image: 'https://images.unsplash.com/photo-1520975918318-3f72c802fd47', 
    category: 'Women', 
    sizes: ['M','L','XL'] 
  },
  { 
    name: 'Sports Jacket', 
    description: 'Windbreaker', 
    price: 1899, 
    image: 'https://images.unsplash.com/photo-1520975918318-3f72c802fd47', 
    category: 'Men', 
    sizes: ['M','L'] 
  }
];

(async () => {
  try {
    await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/merndb');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeded products');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
