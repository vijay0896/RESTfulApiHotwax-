const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Define routes for Product
router
  .route("/")
  .get(productController.getAllProducts) // Get all Products
  .post(productController.createProduct); // Create a new Product

router
  .route("/:id")
  .get(productController.getProductById) // Get a Product by ID
  .put(productController.updateProduct) // Update a Product by ID
  .delete(productController.deleteProduct); // Delete a Product by ID

module.exports = router;
