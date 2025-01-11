const mongoose = require("mongoose");

const orderHeaderSchema = new mongoose.Schema({
  orderDate: { type: Date, required: true },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shippingContactMechId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ContactMech",
    required: true,
  },
  billingContactMechId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ContactMech",
    required: true,
  },
});

module.exports = mongoose.model("OrderHeader", orderHeaderSchema);
