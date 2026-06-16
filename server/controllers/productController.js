import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    const formatted = products.map(product => ({
      ...product.toObject(),
      id: product._id,
      images: product.carousel && product.carousel.length > 0 ? product.carousel : [product.mainImg]
    }));
    res.json({ products: formatted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:slug
// @access  Public
export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.slug });
    const formatted = products.map(product => ({
      ...product.toObject(),
      id: product._id,
      images: product.carousel && product.carousel.length > 0 ? product.carousel : [product.mainImg]
    }));
    res.json({ products: formatted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product details
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json({
        ...product.toObject(),
        id: product._id,
        images: product.carousel && product.carousel.length > 0 ? product.carousel : [product.mainImg]
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid product ID' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  const { title, description, mainImg, carousel, category, sizes, gender, price, discount, reviews } = req.body;

  try {
    const product = new Product({
      title,
      description,
      mainImg,
      carousel: carousel || [],
      category,
      sizes: sizes || ['S', 'M', 'L', 'XL'],
      gender: gender || 'unisex',
      price: Number(price),
      discount: Number(discount) || 0,
      reviews: reviews || []
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  const { title, description, mainImg, carousel, category, sizes, gender, price, discount, reviews } = req.body;

  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = title || product.title;
      product.description = description || product.description;
      product.mainImg = mainImg || product.mainImg;
      product.carousel = carousel || product.carousel;
      product.category = category || product.category;
      product.sizes = sizes || product.sizes;
      product.gender = gender || product.gender;
      product.price = price !== undefined ? Number(price) : product.price;
      product.discount = discount !== undefined ? Number(discount) : product.discount;
      if (reviews !== undefined) {
        product.reviews = reviews;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
