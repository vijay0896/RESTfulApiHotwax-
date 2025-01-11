const OrderHeader = require("../models/Order-Header-model");
const Customer = require("../models/user-model");
const ContactMech = require("../models/Contact_Mech-model");

// Create a new OrderHeader
exports.createOrderHeader = async (req, res) => {
  try {
    const {
      orderDate=new Date(),
      customerId,
      shippingContactMechId,
      billingContactMechId,
    } = req.body;


    // Validate Customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Validate Shipping Contact Mechanism
    const shippingContact = await ContactMech.findById(shippingContactMechId);
    if (!shippingContact) {
      return res
        .status(404)
        .json({ message: "Shipping ContactMech not found" });
    }

    // Validate Billing Contact Mechanism
    const billingContact = await ContactMech.findById(billingContactMechId);
    if (!billingContact) {
      return res.status(404).json({ message: "Billing ContactMech not found" });
    }

    const newOrderHeader = new OrderHeader({
      orderDate,
      customerId,
      shippingContactMechId,
      billingContactMechId,
    });

    const savedOrderHeader = await newOrderHeader.save();
    res.status(201).json(savedOrderHeader);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating OrderHeader", error: error.message });
  }
};

// Get all OrderHeaders
exports.getAllOrderHeaders = async (req, res) => {
  try {
    const orderHeaders = await OrderHeader.find()
      .populate("customerId", "firstName lastName email")
      .populate("shippingContactMechId")
      .populate("billingContactMechId");

    res.status(200).json(orderHeaders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching OrderHeaders", error: error.message });
  }
};

// Get an OrderHeader by ID
exports.getOrderHeaderById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderHeader = await OrderHeader.findById(id)
      .populate("customerId", "firstName lastName email")
      .populate("shippingContactMechId")
      .populate("billingContactMechId");

    if (!orderHeader) {
      return res.status(404).json({ message: "OrderHeader not found" });
    }

    res.status(200).json(orderHeader);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching OrderHeader", error: error.message });
  }
};

// Update an OrderHeader
exports.updateOrderHeader = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedOrderHeader = await OrderHeader.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOrderHeader) {
      return res.status(404).json({ message: "OrderHeader not found" });
    }

    res.status(200).json(updatedOrderHeader);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating OrderHeader", error: error.message });
  }
};

// Delete an OrderHeader
exports.deleteOrderHeader = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrderHeader = await OrderHeader.findByIdAndDelete(id);

    if (!deletedOrderHeader) {
      return res.status(404).json({ message: "OrderHeader not found" });
    }

    res.status(200).json({ message: "OrderHeader deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting OrderHeader", error: error.message });
  }
};
