const express = require("express");
const router = express.Router();
const contactMechController = require("../controllers/contactMechController");

// Define routes for ContactMech
router
  .route("/")
  .get(contactMechController.getAllContactMechs) // Get all ContactMech entries
  .post(contactMechController.createContactMech); // Create a new ContactMech

router
  .route("/:id")
  .get(contactMechController.getContactMechById) // Get a ContactMech by ID
  .put(contactMechController.updateContactMech) // Update a ContactMech by ID
  .delete(contactMechController.deleteContactMech); // Delete a ContactMech by ID

module.exports = router;
