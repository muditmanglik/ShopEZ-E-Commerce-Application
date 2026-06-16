import express from 'express';
import { getCart, addToCart, updateCartItem, deleteCartItem, clearCart } from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addToCart);
router.delete('/', protect, clearCart);

router.put('/:id', protect, updateCartItem);
router.delete('/:id', protect, deleteCartItem);

export default router;
