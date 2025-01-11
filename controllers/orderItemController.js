const OrderItem = require("../models/Order-Item-model");
const OrderHeader = require("../models/Order-Header-model");
const Product = require("../models/Product-Schema-model");

// Create a new OrderItem
exports.createOrderItem = async (req, res) => {
  try {
    const { orderId, productId, quantity, status } = req.body;

    // Validate OrderHeader
    const order = await OrderHeader.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Validate Product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newOrderItem = new OrderItem({
      orderId,
      productId,
      quantity,
      status,
    });

    const savedOrderItem = await newOrderItem.save();
    res.status(201).json(savedOrderItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating OrderItem", error: error.message });
  }
};

// Get all OrderItems
exports.getAllOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find()
      .populate("orderId", "orderDate customerId")
      .populate("productId", "productName color size");

    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching OrderItems", error: error.message });
  }
};

// Get an OrderItem by ID
exports.getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findById(id)
      .populate("orderId", "orderDate customerId")
      .populate("productId", "productName color size");

    if (!orderItem) {
      return res.status(404).json({ message: "OrderItem not found" });
    }

    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching OrderItem", error: error.message });
  }
};

// Update an OrderItem
exports.updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedOrderItem = await OrderItem.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedOrderItem) {
      return res.status(404).json({ message: "OrderItem not found" });
    }

    res.status(200).json(updatedOrderItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating OrderItem", error: error.message });
  }
};

// Delete an OrderItem
exports.deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrderItem = await OrderItem.findByIdAndDelete(id);

    if (!deletedOrderItem) {
      return res.status(404).json({ message: "OrderItem not found" });
    }

    res.status(200).json({ message: "OrderItem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting OrderItem", error: error.message });
  }
};
