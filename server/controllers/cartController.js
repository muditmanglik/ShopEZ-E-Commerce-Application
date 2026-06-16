import Cart from '../models/Cart.js';

// @desc    Get user cart items
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({ UserId: req.user._id });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to cart or increment quantity
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
  const { title, description, mainImg, size, Price, Discount, Quantity } = req.body;

  try {
    let cartItem = await Cart.findOne({
      UserId: req.user._id,
      title,
      size: size || 'M',
    });

    if (cartItem) {
      cartItem.Quantity += (Quantity || 1);
      const updatedItem = await cartItem.save();
      res.json(updatedItem);
    } else {
      cartItem = new Cart({
        UserId: req.user._id,
        title,
        description: description || '',
        mainImg,
        Quantity: Quantity || 1,
        size: size || 'M',
        Price,
        Discount: Discount || 0,
      });

      const savedItem = await cartItem.save();
      res.status(201).json(savedItem);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:id
// @access  Private
export const updateCartItem = async (req, res) => {
  const { Quantity } = req.body;

  try {
    const cartItem = await Cart.findById(req.params.id);

    if (cartItem) {
      if (cartItem.UserId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to modify this cart item' });
      }

      cartItem.Quantity = Quantity;
      if (cartItem.Quantity <= 0) {
        await Cart.deleteOne({ _id: req.params.id });
        res.json({ message: 'Item removed from cart' });
      } else {
        const updatedItem = await cartItem.save();
        res.json(updatedItem);
      }
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete cart item
// @route   DELETE /api/cart/:id
// @access  Private
export const deleteCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);

    if (cartItem) {
      if (cartItem.UserId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to modify this cart item' });
      }

      await Cart.deleteOne({ _id: req.params.id });
      res.json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear all items in user's cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ UserId: req.user._id });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
