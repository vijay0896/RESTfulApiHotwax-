const mongoose = require("mongoose");

const contactMechSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  phoneNumber: { type: String },
  email: { type: String },
});

module.exports = mongoose.model("ContactMech", contactMechSchema);
