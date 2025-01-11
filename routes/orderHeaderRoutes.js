const express = require("express");
const router = express.Router();
const orderHeaderController = require("../controllers/orderHeaderController");

// Define routes for OrderHeader
router
  .route("/")
  .get(orderHeaderController.getAllOrderHeaders) // Get all OrderHeaders
  .post(orderHeaderController.createOrderHeader); // Create a new OrderHeader

router
  .route("/:id")
  .get(orderHeaderController.getOrderHeaderById) // Get an OrderHeader by ID
  .put(orderHeaderController.updateOrderHeader) // Update an OrderHeader by ID
  .delete(orderHeaderController.deleteOrderHeader); // Delete an OrderHeader by ID

module.exports = router;
