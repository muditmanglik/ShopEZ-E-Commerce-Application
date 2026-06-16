import Order from '../models/Order.js';

// @desc    Create new orders (flat items structure)
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  const { name, Mobile, Email, Address, Pincode, paymentMethod, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  try {
    const createdOrders = [];

    // Create a separate Order document for each item in the cart, adhering to the flat ER model
    for (const item of items) {
      const order = new Order({
        UserId: req.user._id,
        name,
        Mobile,
        Email,
        Address,
        Pincode,
        Title: item.title,
        Desc: item.description || '',
        Image: item.mainImg || item.Image,
        Size: item.size || 'M',
        Quantity: Number(item.Quantity || item.quantity),
        Price: Number(item.Price || item.price),
        Discount: Number(item.Discount || item.discount || 0),
        payment: {
          method: paymentMethod || 'COD',
        },
        Status: 'Pending',
      });

      const savedOrder = await order.save();
      createdOrders.push(savedOrder);
    }

    res.status(201).json(createdOrders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ UserId: req.user._id }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (admin only)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ orderDate: -1 }).populate('UserId', 'username email');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  const { Status } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.Status = Status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
