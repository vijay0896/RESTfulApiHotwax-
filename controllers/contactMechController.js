const ContactMech = require("../models/Contact_Mech-model");
const Customer = require("../models/user-model");

// Create a new ContactMech
exports.createContactMech = async (req, res) => {
  try {
    const {
      customerId,
      streetAddress,
      city,
      state,
      postalCode,
      phoneNumber,
      email,
    } = req.body;

    // Check if the customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const newContactMech = new ContactMech({
      customerId,
      streetAddress,
      city,
      state,
      postalCode,
      phoneNumber,
      email,
    });

    const savedContactMech = await newContactMech.save();
    res.status(201).json(savedContactMech);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating ContactMech", error: error.message });
  }
};

// Get all ContactMech entries
exports.getAllContactMechs = async (req, res) => {
  try {
    const contactMechs = await ContactMech.find().populate(
      "customerId",
      "firstName lastName email"
    );
    res.status(200).json(contactMechs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ContactMechs", error: error.message });
  }
};

// Get a ContactMech by ID
exports.getContactMechById = async (req, res) => {
  try {
    const { id } = req.params;
    const contactMech = await ContactMech.findById(id).populate(
      "customerId",
      "firstName lastName email"
    );
    if (!contactMech) {
      return res.status(404).json({ message: "ContactMech not found" });
    }
    res.status(200).json(contactMech);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ContactMech", error: error.message });
  }
};

// Update a ContactMech
exports.updateContactMech = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedContactMech = await ContactMech.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedContactMech) {
      return res.status(404).json({ message: "ContactMech not found" });
    }

    res.status(200).json(updatedContactMech);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating ContactMech", error: error.message });
  }
};

// Delete a ContactMech
exports.deleteContactMech = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContactMech = await ContactMech.findByIdAndDelete(id);

    if (!deletedContactMech) {
      return res.status(404).json({ message: "ContactMech not found" });
    }

    res.status(200).json({ message: "ContactMech deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting ContactMech", error: error.message });
  }
};
