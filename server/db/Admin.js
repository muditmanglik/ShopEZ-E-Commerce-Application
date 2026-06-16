import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  categoriesManaged: {
    type: [String],
    default: [],
  },
  bannersManaged: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
