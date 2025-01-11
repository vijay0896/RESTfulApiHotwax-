const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OrderHeader",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("OrderItem", orderItemSchema);
