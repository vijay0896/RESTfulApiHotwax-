const userModel = require("../models/user-model");

var jwt = require("jsonwebtoken");
// const { sendEmail } = require("./emailService");
const bcrypt = require("bcrypt");
const Home = async (req, res) => {
  try {
    res.send("welcome Home");
  } catch (error) {
    console.log(error);
  }
};

const Register = async (req, res) => {
  try {
    const { firstName,lastName, email, password } = req.body;
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const userCreated = await userModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    // Generate a token for the user
    const token = await userCreated.generateToken();

    // Send the response
    return res.status(201).json({
      msg: "Register successful",
      token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (!userExists) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = await bcrypt.compare(password, userExists.password);

    if (user) {
      res.status(200).json({
        msg: "Login succesful",
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
      });
    } else {
      res.status(401).json({ message: "invalid email or password" });
    }
  } catch (error) {
    res.status(500).json("interal server error");
  }
};

const User = async (req, res) => {
  try {
    const userData = req.user;

    if (!userData) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Send the user details (name, phone, and email)
    return res.status(200).json({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
     
    });
  } catch (error) {
    console.error(`Error from the user route: ${error}`);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Function to generate a random reset token
const generateCode = (length) => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

const ResetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    // userModel = Schemas.SIGNIN
    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      console.error({ success: false, message: "There was an Error" });
      return res.send({
        success: false,
        message: "If user exists, an email was sent",
      });
    }

    const token = await generateCode(5);
    existingUser.resettoken = token;
    existingUser.resettokenExpiration = Date.now() + 3600000;
    await existingUser.save();
    await sendEmail(email, `Here is your Reset Token ${token}`);
    return res.send({ success: true, message: "Email sent" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { Home, Register, Login, User, ResetPassword };
