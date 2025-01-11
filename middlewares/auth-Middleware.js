const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
  }

  // Assuming token is in the format "Bearer <jwtToken>", removing the "Bearer" prefix
  const jwtToken = token.replace("Bearer", "").trim();

  try {
    // Verifying the token
    const isVerified = jwt.verify(jwtToken, "secret");

    // Fetch the user details based on the email extracted from the token
    const userData = await userModel.findOne({ email: isVerified.email }).select({ password: 0 });

    // Check if userData is found
    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user data to the request object
    req.token = token;
    req.user = userData;
    req.userID = userData._id; // Ensure the user is assigned to the request

    // Move on to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
