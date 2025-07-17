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
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product: ", error);
    res.status(400).json({ message: error.message });
  }
});

// GET /api/products/:id (Read a Single Product)
// Retrieves a single product by its _id.
// If the product is found, responds with the product object.
// If no product is found, responds with a 404 status code.
router.get("/", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/products/:id (Update a Product)
// Updates a product by its _id with the data from req.body.
// Responds with the updated product data (use the { new: true } option).
// If no product is found to update, responds with a 404 status code.
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body,
    { new: true }
  );
  if (!updated) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
  });

// DELETE /api/products/:id (Delete a Product)
// Deletes a product by its _id.
// If successful, responds with a success message.
// If no product is found to delete, responds with a 404 status code.
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found to be deleted"});
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products (Read All Products with Advanced Querying)
// This is the most complex endpoint. It should retrieve all products but also support the following optional query parameters:
// category: Filter products by a specific category.
// minPrice: Filter products with a price greater than or equal to this value.
// maxPrice: Filter products with a price less than or equal to this value.
// sortBy: Sort results. For example, price_asc for ascending price or price_desc for descending price.
// page & limit: For pagination (defaulting to page 1, limit 10).
// Dynamically build the Mongoose query based on which query parameters are provided.
// Respond with an array of the resulting products.
router.get("/", async (req, res) => {
  // get the query values//
  const { category, sortBy, minPrice, maxPrice } = req.query;
  let { page, limit } = req.query;

  // check if the category query was sent or not//
  if(category) {
    query.category = { $eq: category };
  }

  // handle price range filtering//
  if(minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      // use parseFloat to convert the query parameters which are always strings to numeric values as dealing with numbers and what correct comparsions//
      query.price.$gte = parseFloat(minPrice);
    }
    if (maxPrice) {
      query.price.$lte = parseFloat(maxPrice);
    }
  }
  if (sortBy) {
    const [field, direction] = sortBy.split("_");
    sort[field] = direction === "asc" ? 1 : -1;
  }

  // set defaults for pagination//
  //     parseInt--convert to interger --|| 1 if the result is falsy--use 1 instead//
  // this handles missing, invalid, and or empty values//
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  try {
    const products = await Product.find(query)
    // .select --projection to exclude version and id //
    .select({__v: 0, _id: 0 })
    // sort results based on the sort object -- if sortBy = "price_asc" --which means sort= { price: 1 } --that is 1=ascending; if sortBy = "price_desc" sort= { price: -1 } --that is  -1=descending price
    // also another example { name:1 } ---sort by name: A to Z --or sort = { name: -1 } sort by name: Z to A//
    .sort (sort)
    // skips a certain number of documents (for pagination) -- example -- for page = 1, limit = 10 -- skip = (1 - 1) * 10 = 0  means skip 0 documents (show first 10);
    // example 2 -- skip = (2 -1) * 10 = 10 --- for requirement of page = 2, limit = 10 ----so it skips 10 documents (show next 10)//
    .skip((page - 1) * limit)
    // limits how many documents to return -- example --- .limit(10) means return max of 10 documents//
    .limit(limit);

    // example --- URL: /api/products?page=2&limit=5&sortBy=price_asc ----the results are in: 
    // Product.find(query)
    // .sort({ price: 1 })  this is sort by price ascending -- 1 means ascending
    // .skip(5)  this means skip the first 5 products
    // .limit(5)  this means return next 5 products
    // this gives me products 6-10, sorted by price low to high//

    // counts how many documents match my query (without pagination)---example totalDocs = 47 --uses same query filter as my main search -- so if query = { category: "Electronics"} 
    // it counts only electronics products//
    const totalDocs = await Product.countDocuments(query);
    // calculates how many pages are needed --- example --- 47 products, 10 per page ---totalPages = Math.ceil(47 / 10) = Math.ceil(4.7) = 5 -- means need5 pages for 47 items//
    const totalPages = Math.ceil(totalDocs / limit);

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;










