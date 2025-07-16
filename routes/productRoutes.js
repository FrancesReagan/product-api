import express from "express";
import Product from "../models/Product.js";

const router = express.Router();


// seeding my product database//
// Add sample products to database---can also use to make dummy users etc to test //
// --in routes so don't need to add individually via POST//
router.get("/db/seed", async (req, res) => {
  try {
    await Product.deleteMany({});

    const sampleProducts = [
      { name: "Air Purifier", price: 125.99, category: "Home Goods" },
      { name: "Deep Fryer", price: 69.99, category: "Kitchen" },
      { name: "Yoga Mat", price: 19.99, category: "Fitness" },
      { name: "Ugg Boots", price: 189.99, category: "Footwear" },
      { name: "Tea Kettle", price: 39.99, category: "Kitchen" },
      { name: "Rosewater", price: 12.99, category: "Beauty" },
      { name: "Solar Lamp", price: 22.99, category: "Home" },
      { name: "Water Bottle", price: 9.99, category: "Fitness" },
      { name: "Purse", price: 34.99, category: "Accessories" },
      { name: "Rose Blush", price: 9.99, category: "Beauty" },
    ];

    const createdProducts = await Product.insertMany(sampleProducts);

     res
      .status(201)
      .json({ message: "Seed successful", products: createdProducts });
  } catch (error) {
    res.status(500).json({ message: "Seed failed", error: error.message });
  }
});

// POST /api/products (Create a Product)
// Creates a new product based on the req.body.
// Responds with the newly created product and a 201 status code.
// If validation fails, it should return a 400 status code with a descriptive error message.
// 
// going to seed my database--then use the router post below as functionality to add more products
router.post("/", async (req, res))





export default router;


// In routes/productRoutes.js, use express.Router() to define your API endpoints. The logic for each route should be handled directly within the route file for this assessment.

// Implement the following endpoints. All endpoints must handle potential errors with try...catch blocks and return appropriate status codes and JSON responses.



// GET /api/products/:id (Read a Single Product)
// Retrieves a single product by its _id.
// If the product is found, responds with the product object.
// If no product is found, responds with a 404 status code.


// PUT /api/products/:id (Update a Product)
// Updates a product by its _id with the data from req.body.
// Responds with the updated product data (use the { new: true } option).
// If no product is found to update, responds with a 404 status code.
// DELETE /api/products/:id (Delete a Product)

// Deletes a product by its _id.
// If successful, responds with a success message.
// If no product is found to delete, responds with a 404 status code.

// GET /api/products (Read All Products with Advanced Querying)
// This is the most complex endpoint. It should retrieve all products but also support the following optional query parameters:
// category: Filter products by a specific category.
// minPrice: Filter products with a price greater than or equal to this value.
// maxPrice: Filter products with a price less than or equal to this value.
// sortBy: Sort results. For example, price_asc for ascending price or price_desc for descending price.
// page & limit: For pagination (defaulting to page 1, limit 10).
// Dynamically build the Mongoose query based on which query parameters are provided.
// Respond with an array of the resulting products.