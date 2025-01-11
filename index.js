const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./Config/db");
const authRoute = require("./routes/auth-routes");
const errorMiddleware = require("./middlewares/error-middleware");
const contactMechRoutes = require("./routes/contactMechRoutes");
const orderHeaderRoutes = require("./routes/orderHeaderRoutes");
const productRoutes = require("./routes/productRoutes");
const orderItemRoutes = require("./routes/orderItemRoutes");
dotenv.config();
connectDb();
// middlewares

var corsOptions = {
  origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
  methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
  credentials: true,
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("Hello");
});
//Routes for Auth
app.use("/api/auth", authRoute);
app.use("/api/contactMech", contactMechRoutes);
app.use("/api/orderHeader", orderHeaderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orderItems", orderItemRoutes);
const PORT = process.env.PORT;
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log("server is starting");
});
