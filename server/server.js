import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Multer File Upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/images'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Mock category groups and their respective sub-categories
const categoryGroups = {
  'Pharmacy': ['Prescription Diet', 'Dewormer', 'Tick & Flea', 'Skin Care', 'Joint Care', 'Gut Health', 'Cardiac Care', 'Kidney Care', 'Liver Care', 'Eye & Ear Care', 'Vitamins & Supplements', 'Pain Medication', 'Anti-biotics', 'Oral Care', 'Wound Care', 'Calming Aids'],
  'Food': ['Dry Food', 'Wet Food', 'Puppy Food', 'Grain Free Food', 'Baked Dry Food', 'Veg Dog Food', 'Premium Dog Food', 'Kitten Food', 'Foods'],
  'Snacks & Treats': ['Biscuits & Cookies', 'Bones & Chews', 'Dental Treats', 'Jerky Treats', 'Training Treats', 'Creamy Treats', 'Ice Creams', 'Biryanis'],
  'Grooming Essentials': ['Shampoos & Conditioners', 'Tick & Flea Solutions', 'Brushes & Combs', 'Trimmers & Nail Clippers', 'Paw & Nail Care', 'Oral Care', 'Deodorants & Perfumes', 'Towels & Wipes', 'Diapers & Training Pads', 'Cleaning & Waste Disposal', 'Pet Safe Cleaners'],
  'Accessories': ['Collars', 'Leashes', 'Harnesses', 'Bowls & Feeders', 'Bedding', 'Clothing', 'Carriers & Travel Supplies', 'Cages & Crates'],
  'Toys': ['Cat Teasers', 'Ball & Chaser Toys', 'Catnip Toys', 'Cat Trees & Scratchers', 'Chew Toys', 'Smart & Interactive Toys', 'Plush & Soft Toys', 'Rope & Tug Toys', 'Ball & Fetch Toys', 'Squeaky Toys'],
  'Species': ['Dogs', 'Cats', 'Birds', 'Large Animals', 'Others'],
  'Brand': ['Royal Canin', 'Pedigree', 'Drools', 'Pedigree Pro', 'Focus', 'Whiskas', 'Moo', 'Purepet', 'Grain Zero', 'Fidel', 'Pet Star', 'Himalaya', 'Vet Pro', 'Jerhigh', 'Canine Creek', 'Bowlers', 'Moochie', 'Supercoat']
};

// Mock products database
let products = [
  {
    id: 'eazypet-tablet',
    name: 'Eazypet Vet Tablet 10 Tablet',
    description: 'Broad-spectrum dewormer for adult dogs. Safe, effective and easy to administer chewable formula that controls major species of intestinal worms.',
    price: 400,
    originalPrice: 418,
    category: 'Dewormer',
    brand: 'Intas',
    image: '/images/eazypet_vet_tablet.png',
    rating: 4.8,
    reviewsCount: 142,
    composition: 'Praziquantel IP 50 mg, Pyrantel Embonate IP 144 mg, Febantel IP 150 mg',
    dosage: '1 tablet per 10 kg body weight or as recommended by vet.',
    popular: true,
    weightGroup: 'Dog Health',
    inStock: true
  },
  {
    id: 'eazypet-puppy',
    name: 'Eazypet Puppy Dewormer Vet Oral Suspension 20 Ml',
    description: 'Specialized dewormer oral suspension formulation for young puppies. Highly safe, tasty flavor to help treat and prevent roundworm infections.',
    price: 190,
    originalPrice: 205,
    category: 'Dewormer',
    brand: 'Intas',
    image: '/images/eazypet_puppy.png',
    rating: 4.7,
    reviewsCount: 95,
    composition: 'Pyrantel Embonate IP 14.4 mg, Febantel IP 15 mg per ml',
    dosage: '1 ml per 1 kg body weight, starts from 2 weeks of age. Repeat every fortnight till 3 months.',
    popular: true,
    weightGroup: 'Puppy Care',
    inStock: true
  },
  {
    id: 'worex-suspension',
    name: 'Worex Suspension 15 Ml',
    description: 'Highly effective puppy dewormer suspension. Liquid formula makes dosing effortless. Clears hookworms and roundworms thoroughly.',
    price: 105,
    originalPrice: 110,
    category: 'Dewormer',
    brand: 'Savoir',
    image: '/images/worex_suspension.png',
    rating: 4.9,
    reviewsCount: 188,
    composition: 'Pyrantel Embonate & Febantel Suspension',
    dosage: 'As prescribed by your veterinarian based on puppy weight chart.',
    popular: true,
    weightGroup: 'Puppy Care',
    inStock: true
  },
  {
    id: 'simparica-trio-40-60',
    name: 'Simparica Trio Tablet (40-60kg) 3 Tablet',
    description: 'High-premium monthly liver-flavored chewable tablet. Provides advanced 3-in-1 protection against heartworms, fleas & ticks, and dangerous intestinal hookworms & roundworms.',
    price: 2600,
    originalPrice: 2745,
    category: 'Tick & Flea',
    brand: 'Zoetis',
    image: '/images/simparica_trio_tablet.png',
    rating: 4.9,
    reviewsCount: 312,
    composition: 'Sarolaner, Moxidectin, Pyrantel',
    dosage: 'Specifically formulated for dogs weighing 40-60kg. Give 1 chewable tablet monthly.',
    popular: true,
    weightGroup: 'Dog Health',
    inStock: true
  },
  {
    id: 'simparica-trio-2-5-5',
    name: 'Simparica Trio Tablet (2.5-5kg) 3 Tablet',
    description: 'Chewable tablets for dogs weighing 2.5-5kg. Monthly flea, tick, heartworm, roundworm, and hookworm protection.',
    price: 2200,
    originalPrice: 2300,
    category: 'Tick & Flea',
    brand: 'Zoetis',
    image: '/images/simparica_trio_tablet.png',
    rating: 4.8,
    reviewsCount: 114,
    composition: 'Sarolaner, Moxidectin, Pyrantel',
    dosage: 'For dogs weighing 2.5-5kg. Give 1 chewable tablet monthly.',
    popular: false,
    weightGroup: 'Dog Health',
    inStock: true
  },
  {
    id: 'simparica-trio-20-40',
    name: 'Simparica Trio Tablet (20-40kg) 3 Tablet',
    description: 'Premium chewable tablets for dogs weighing 20-40kg. Formulated for convenient once-a-month broad-spectrum prevention.',
    price: 2500,
    originalPrice: 2650,
    category: 'Tick & Flea',
    brand: 'Zoetis',
    image: '/images/simparica_trio_tablet.png',
    rating: 4.9,
    reviewsCount: 224,
    composition: 'Sarolaner, Moxidectin, Pyrantel',
    dosage: 'For dogs weighing 20-40kg. Give 1 chewable tablet monthly.',
    popular: false,
    weightGroup: 'Dog Health',
    inStock: true
  },
  {
    id: 'simparica-trio-10-20',
    name: 'Simparica Trio Tablet (10-20kg) 3 Tablet',
    description: 'Monthly multi-parasite prevention tablet for dogs weighing 10-20kg. Easy-to-give flavored chewable.',
    price: 2400,
    originalPrice: 2550,
    category: 'Tick & Flea',
    brand: 'Zoetis',
    image: '/images/simparica_trio_tablet.png',
    rating: 4.9,
    reviewsCount: 153,
    composition: 'Sarolaner, Moxidectin, Pyrantel',
    dosage: 'For dogs weighing 10-20kg. Give 1 chewable tablet monthly.',
    popular: false,
    weightGroup: 'Dog Health',
    inStock: true
  },
  {
    id: 'simparica-trio-5-10',
    name: 'Simparica Trio Tablet (5-10kg) 3 Tablet',
    description: 'Monthly flavored chewable tablet that treats and prevents fleas, ticks, heartworms, and intestinal hookworms & roundworms.',
    price: 2300,
    originalPrice: 2450,
    category: 'Tick & Flea',
    brand: 'Zoetis',
    image: '/images/simparica_trio_tablet.png',
    rating: 4.8,
    reviewsCount: 88,
    composition: 'Sarolaner, Moxidectin, Pyrantel',
    dosage: 'For dogs weighing 5-10kg. Give 1 chewable tablet monthly.',
    popular: false,
    weightGroup: 'Dog Health',
    inStock: true
  }
];

// Product search, filter, and sorting API
app.get('/api/products', (req, res) => {
  const { category, search, minPrice, maxPrice, sort } = req.query;
  let filteredProducts = [...products];

  // 1. Category filter
  if (category && category !== 'All Products') {
    const categoryLower = category.toLowerCase();
    
    // Find if the requested category is a main group name (e.g. "Pharmacy", "Food")
    const groupKey = Object.keys(categoryGroups).find(
      (k) => k.toLowerCase() === categoryLower
    );
    
    if (groupKey) {
      // If it is a main group, match any products that have that group category or any sub-categories belonging to it
      const subcategoriesLower = categoryGroups[groupKey].map((s) => s.toLowerCase());
      filteredProducts = filteredProducts.filter(
        (p) => 
          p.category.toLowerCase() === categoryLower ||
          subcategoriesLower.includes(p.category.toLowerCase())
      );
    } else {
      // Otherwise, filter by exact subcategory/brand/species, etc.
      filteredProducts = filteredProducts.filter(
        (p) => p.category.toLowerCase() === categoryLower
      );
    }
  }

  // 2. Search query filter
  if (search) {
    const query = search.toString().toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  // 3. Price range filter
  if (minPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter((p) => p.price <= parseFloat(maxPrice));
  }

  // 4. Sorting logic
  if (sort) {
    switch (sort) {
      case 'price-asc':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filteredProducts.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
        break;
      case 'Recommended':
      default:
        // Default sort (Recommended, matches initial order with popular products first)
        filteredProducts.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
    }
  }

  res.json({
    status: 'success',
    results: filteredProducts.length,
    data: filteredProducts
  });
});

// Authentication endpoint (mocked)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password!'
    });
  }

  // Accept any login for demo purposes, generate mock token & user info
  const name = email.split('@')[0];
  res.json({
    status: 'success',
    token: 'mock-jwt-token-12345',
    user: {
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${name}`
    }
  });
});

// Checkout endpoint (mocked)
app.post('/api/checkout', (req, res) => {
  const { items, shippingAddress } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Your cart is empty!'
    });
  }

  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  res.json({
    status: 'success',
    orderId,
    message: 'Order placed successfully! Thank you for shopping with Dr. Snoopy.'
  });
});

// Product upload API (Admin Panel Integration)
app.post('/api/products', upload.single('image'), (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    price,
    originalPrice,
    composition,
    dosage,
    weightGroup
  } = req.body;

  if (!name || !price || !category || !req.file) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide product name, price, category, and an image file!'
    });
  }

  const newProduct = {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(1000 + Math.random() * 9000),
    name,
    description: description || 'No description provided.',
    price: parseFloat(price),
    originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
    category,
    brand: brand || 'Generic',
    image: `/images/${req.file.filename}`,
    rating: 5.0,
    reviewsCount: 1,
    composition: composition || 'Standard active elements.',
    dosage: dosage || 'As directed by a veterinarian.',
    popular: false,
    weightGroup: weightGroup || 'General',
    inStock: true
  };

  products.push(newProduct);

  res.status(201).json({
    status: 'success',
    data: newProduct
  });
});

// Delete product endpoint
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);

  if (products.length === initialLength) {
    return res.status(404).json({
      status: 'fail',
      message: 'Product not found!'
    });
  }

  res.json({
    status: 'success',
    message: 'Product deleted successfully!'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
