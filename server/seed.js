import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './db/User.js'; // Point directly to db folder
import Product from './models/Product.js';
import Category from './models/Category.js';
import Banner from './models/Banner.js';

dotenv.config();

// Custom seed data
const categoriesData = [
  { name: 'Mens Shirts', slug: 'mens-shirts' },
  { name: 'Mens Shoes', slug: 'mens-shoes' },
  { name: 'Womens Dresses', slug: 'womens-dresses' },
  { name: 'Womens Shoes', slug: 'womens-shoes' },
  { name: 'Womens Bags', slug: 'womens-bags' },
  { name: 'Tops', slug: 'tops' },
  { name: 'Fragrances', slug: 'fragrances' }
];

const bannersData = [
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
    title: 'SUMMER SALE',
    subtitle: 'GET UP TO 50% OFF ON FASHION'
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    title: 'NEW ARRIVALS',
    subtitle: 'EXPLORE THE LATEST TRENDS'
  }
];

const productsData = [
  {
    title: 'Classic White Linen Shirt',
    description: 'Breathable, high-quality linen shirt perfect for summer days or semi-formal evenings.',
    mainImg: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'mens-shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    gender: 'men',
    price: 45,
    discount: 10,
    reviews: [
      { reviewerName: 'Michael Scott', reviewerEmail: 'michael@example.com', rating: 4, comment: 'Very comfortable shirt for the office!' }
    ]
  },
  {
    title: 'Casual Blue Denim Shirt',
    description: 'Rugged denim shirt with double breast pockets. Great for layering or wearing on its own.',
    mainImg: 'https://images.unsplash.com/photo-1588359348347-9bc6cbaa689e?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1588359348347-9bc6cbaa689e?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'mens-shirts',
    sizes: ['M', 'L', 'XL'],
    gender: 'men',
    price: 55,
    discount: 0,
    reviews: [
      { reviewerName: 'James Dean', reviewerEmail: 'james@example.com', rating: 5, comment: 'Super stylish and excellent fit.' }
    ]
  },
  {
    title: 'Leather Oxford Shoes',
    description: 'Premium brown leather oxfords with comfortable soles. Ideal for corporate wear or formal occasions.',
    mainImg: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'mens-shoes',
    sizes: ['8', '9', '10', '11'],
    gender: 'men',
    price: 120,
    discount: 15,
    reviews: [
      { reviewerName: 'Bruce Wayne', reviewerEmail: 'bruce@example.com', rating: 5, comment: 'Top tier quality leather. Very formal.' }
    ]
  },
  {
    title: 'Summer Floral Maxi Dress',
    description: 'Lightweight flowy maxi dress featuring a colorful floral pattern and side slit.',
    mainImg: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'womens-dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    gender: 'women',
    price: 75,
    discount: 20,
    reviews: [
      { reviewerName: 'Lois Lane', reviewerEmail: 'lois@example.com', rating: 5, comment: 'Absolutely beautiful. Got so many compliments!' }
    ]
  },
  {
    title: 'Elegant Black Evening Gown',
    description: 'Sleek floor-length black dress with an open back detail. Turn heads at your next gala.',
    mainImg: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'womens-dresses',
    sizes: ['S', 'M', 'L'],
    gender: 'women',
    price: 150,
    discount: 5,
    reviews: [
      { reviewerName: 'Selina Kyle', reviewerEmail: 'selina@example.com', rating: 5, comment: 'Fits like a glove and looks stunning.' }
    ]
  },
  {
    title: 'Designer Leather Handbag',
    description: 'Chic tan leather handbag with gold-tone hardware and adjustable shoulder strap.',
    mainImg: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'womens-bags',
    sizes: ['One Size'],
    gender: 'women',
    price: 210,
    discount: 25,
    reviews: [
      { reviewerName: 'Pepper Potts', reviewerEmail: 'pepper@example.com', rating: 5, comment: 'A bit expensive but worth every penny. Elegant.' }
    ]
  },
  {
    title: 'Womens White Casual Sneakers',
    description: 'Clean minimalist white sneakers that pair beautifully with skirts, dresses, or jeans.',
    mainImg: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'womens-shoes',
    sizes: ['6', '7', '8', '9'],
    gender: 'women',
    price: 65,
    discount: 0,
    reviews: [
      { reviewerName: 'Mary Jane', reviewerEmail: 'mj@example.com', rating: 4, comment: 'Very comfortable walk-around shoes.' }
    ]
  },
  {
    title: 'Cropped Knit Tank Top',
    description: 'Soft knit ribbed tank top in pastel green. A staple for everyday layering.',
    mainImg: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'tops',
    sizes: ['S', 'M', 'L'],
    gender: 'women',
    price: 28,
    discount: 10,
    reviews: [
      { reviewerName: 'Clara Oswald', reviewerEmail: 'clara@example.com', rating: 4, comment: 'Nice pastel color, fits well.' }
    ]
  },
  {
    title: 'Calvin Klein CK One',
    description: 'Calvin Klein CK One is a classic, clean unisex fragrance with fresh citrus notes.',
    mainImg: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'fragrances',
    sizes: ['One Size'],
    gender: 'unisex',
    price: 49.99,
    discount: 0,
    reviews: [
      { reviewerName: 'Alice Johnson', reviewerEmail: 'alice@example.com', rating: 5, comment: 'Amazing clean scent, perfect for daily wear!' },
      { reviewerName: 'Bob Smith', reviewerEmail: 'bob@example.com', rating: 4, comment: 'Very fresh, but doesn\'t last as long as I hoped.' }
    ]
  },
  {
    title: 'Chanel Coco Noir Eau De',
    description: 'Coco Noir is a modern, luminous oriental fragrance. A magnetic and intense scent.',
    mainImg: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'fragrances',
    sizes: ['One Size'],
    gender: 'women',
    price: 129.99,
    discount: 0,
    reviews: [
      { reviewerName: 'Diana Prince', reviewerEmail: 'diana@example.com', rating: 5, comment: 'Absolute perfection. Very elegant and mysterious.' }
    ]
  },
  {
    title: 'Dior J\'adore',
    description: 'J\'adore is a grand feminine floral fragrance, finely crafted down to the last detail.',
    mainImg: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'fragrances',
    sizes: ['One Size'],
    gender: 'women',
    price: 89.99,
    discount: 0,
    reviews: [
      { reviewerName: 'Elena Gilbert', reviewerEmail: 'elena@example.com', rating: 5, comment: 'My favorite floral fragrance of all time.' }
    ]
  },
  {
    title: 'Dolce Shine Eau de',
    description: 'Dolce Shine is a sunny and cheerful floral-fruity fragrance, full of Italian joy.',
    mainImg: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'fragrances',
    sizes: ['One Size'],
    gender: 'women',
    price: 69.99,
    discount: 0,
    reviews: [
      { reviewerName: 'Fiona Gallagher', reviewerEmail: 'fiona@example.com', rating: 4, comment: 'So fruity and summery! Brings a lot of joy.' }
    ]
  },
  {
    title: 'Gucci Bloom Eau de',
    description: 'Gucci Bloom captures the spirit of the contemporary, diverse, and authentic women of Gucci.',
    mainImg: 'https://images.unsplash.com/photo-1588405748373-122b2321bc31?q=80&w=600&auto=format&fit=crop',
    carousel: [
      'https://images.unsplash.com/photo-1588405748373-122b2321bc31?q=80&w=600&auto=format&fit=crop'
    ],
    category: 'fragrances',
    sizes: ['One Size'],
    gender: 'women',
    price: 79.99,
    discount: 0,
    reviews: [
      { reviewerName: 'Grace Kelly', reviewerEmail: 'grace@example.com', rating: 5, comment: 'Smells like a lush garden of white flowers. Divine!' }
    ]
  }
];

const seedDB = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shopez');
    console.log('Seeder Connected to MongoDB...');

    // Clear old data
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();
    await Banner.deleteMany();
    console.log('Old collection data cleared.');

    // Seed Categories
    await Category.insertMany(categoriesData);
    console.log('Categories seeded.');

    // Seed Banners
    await Banner.insertMany(bannersData);
    console.log('Banners seeded.');

    // Seed Products
    await Product.insertMany(productsData);
    console.log('Products seeded.');

    // Seed Users
    const salt = await bcrypt.genSalt(10);
    const hashedCustomerPassword = await bcrypt.hash('password123', salt);
    const hashedAdminPassword = await bcrypt.hash('adminpassword', salt);

    await User.create([
      {
        username: 'customer123',
        email: 'customer@shopez.com',
        password: 'password123',
        UserType: 'USER'
      },
      {
        username: 'admin123',
        email: 'admin@shopez.com',
        password: 'adminpassword',
        UserType: 'ADMIN'
      }
    ]);
    console.log('Default users seeded:');
    console.log('  Customer Email: customer@shopez.com | Password: password123');
    console.log('  Admin Email: admin@shopez.com | Password: adminpassword');

    console.log('Database Seeding Completed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
