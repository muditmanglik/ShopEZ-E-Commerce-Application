import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
    required: true,
  },
  reviewerEmail: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mainImg: {
    type: String,
    required: true,
  },
  carousel: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
    default: ['S', 'M', 'L', 'XL'],
  },
  gender: {
    type: String,
    required: true,
    enum: ['men', 'women', 'kids', 'unisex'],
    default: 'unisex',
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [reviewSchema],
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
export default Product;
