const express = require("express");
const router = express.Router();
const orderItemController = require("../controllers/orderItemController");

// Define routes for OrderItem
router
  .route("/")
  .get(orderItemController.getAllOrderItems) // Get all OrderItems
  .post(orderItemController.createOrderItem); // Create a new OrderItem

router
  .route("/:id")
  .get(orderItemController.getOrderItemById) // Get an OrderItem by ID
  .put(orderItemController.updateOrderItem) // Update an OrderItem by ID
  .delete(orderItemController.deleteOrderItem); // Delete an OrderItem by ID

module.exports = router;
