require("dotenv").config();
const express = require('express');
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
// const JWT_SECRET = process.env.JWT_SECRET
app.listen(PORT, () => console.log("Server is running on port 5000..."));


