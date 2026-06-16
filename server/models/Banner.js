import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
}, {
  timestamps: true,
});

const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;
