import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  mainImg: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  size: {
    type: String,
    required: true,
    default: 'M',
  },
  Price: {
    type: Number,
    required: true,
    default: 0,
  },
  Discount: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
