import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from './db/connection.js';
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// middleware//
app.use(express.json());

// routes//
app.use("/api/products", productRoutes);

// basic testing route//
app.get("/", async (req, res) => {
  res.status(200).json({ message: "Successfully connected to the database" });
});

//connect to MongoDB and start server//
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server isrunning on port: ${PORT}`));
}) .catch((err) => {
  console.error(`Failed to start server: ${err}`);
});
