import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  Mobile: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Pincode: {
    type: String,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Desc: {
    type: String,
  },
  Image: {
    type: String,
    required: true,
  },
  Size: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Discount: {
    type: Number,
    required: true,
    default: 0,
  },
  payment: {
    method: {
      type: String,
      required: true,
      default: 'COD',
    }
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  Status: {
    type: String,
    required: true,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
