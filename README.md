__Product API__
A RESTful API for managing e-commerce product inventory with advanced filtering, sorting, and paginatoin capabilities.
_Features_
*full Create Read Update Delete operations for products
*advanced querying: filtering, sorting, pagination)
*product categorization and pricing
*stock management
*input validation and error handling

_Install_
*Clone the repo: `git clone<repo-url>` ; `cd product-api`
*Install dependencies: npm i express dotenv mongoose etc
<img width="365" height="524" alt="image" src="https://github.com/user-attachments/assets/5225f709-cf8c-4523-a7e6-d2de0c53a299" />
*Set up env variables: create an .env file in the root directory: `MONGO_URI=your_mongodb_connection_string` 
                                                                   `PORT=3000`

*Start the server: `npm run dev`

----------------------------------------------------------------
_API Endpoints_
Products
method: GET
endpoint: /api/products
description: Get all products (with advanced querying)

method: GET
endpoint: /api/products/:id 
description: get product by ID

method: POST
endpoint: /api/products
description: create new products

method: PUT
endpoint: /api/products/:id 
description: update a product

method: DELETE
endpoint: /api/products/:id 
description: delete product 

----------------------------------------
Database Seeding
Method: GET
Endpoint: /api/products/db/seed
description: populate database with sample products

---------------------------------------------------------------
__Product Schema__
{
name: String (required),
description: String (required),
price:Number(required, >0),
category: String(required),
inStock: Boolean(default:true),
tags: Array of Strings,
createdAt: Date(default: now)
}

------------------------------------------
Advanced Querying: the GET  /api/products endpoint supports powerful query paramenters: 
_filtering:_ *category-filter by product category; * minPrice - minimum price filter; *maxPrice - maximum price filter
_sorting:_ sortBy - sort results (i.e. price_asc, price_desc, name_asc, name_desc)
_pagination:_ page- page number (default: 1); limit - items per page (default:10)

------------------------------------------------------------
_Example Usage_
in Postman
*Seed database (run first)
GET /api/products/db/seed

*Create a product
POST /api/products
in application---body--raw--json:
{
  "name": "wireless headphones",
  "description: "high-quality wireless headphones with noise cancellation",
  "price": 199.99,
  "category": "electronics",
  "inStock": true,
  "tags": ["wireless", "audio", "bluetooth"]
  }

----------------------------------------
_Get All Products_
GET  /api/products

_Advanced Filtering Examples_
#filter by category
GET  /api/products?category=Electronics

#price range filtering
GET  /api/products?minPrice=50&maxPrice=200

#sort by price ascending
GET  /api/products?sortyBy=price_asc

#pagination
GET  /api/products?page=2&limit=5

#combined filters
GET  /api/products?category=Electronics&minPrice=100sortBy=price_desc&page=1&limit=10

_Update a product_
PUT  /api/products/product_id_here
in application: body--raw--json
{
   "price": 179.99,
   "inStock": false
}

--------------------------------------------------------------------------------

_Delete a product_
DELETE  /api/products/product_id_here

_Sample Products(from seed data)_
the seed endpoint created these products:
*Air purifer ($125.99) - Home Goods
*Deep fryer ($69.99) - Kitchen
*yoga mat ($19.99) - fitness
*ugg boots ($189.99) - footwear
*tea kettle ($39.99) - kitchen
etc..

-------------------------------------------------
__Product Structure__
<img width="152" height="257" alt="image" src="https://github.com/user-attachments/assets/e619cf04-7c31-46a7-bff2-4b0d7c2902c7" />

------------------------------------------------------------
_Tech used_
*Node.js - runtime environment; *express.js - web framework; *mongoDB - database; *mongoose - mongoDB object modeling;
*dotenv - environment variable management

------------------------------------------------
_Error Handling_
The API includes comprehensive error handling: 
*201 - created successful POST
*400 - bad request (validation errors)
*404 - resource not found
*500 - internal server error
--------------------------------------------------------
_Testing_
Use Postman to test API endpoints. Start by running the seed endpoint to populate your database with sample data.
-------------------------------------------------------------------
_References:_ 
•	(Express.js Documentation)[https://expressjs.com/] - Web framework for Node.js
•	(Mongoose Documentation)[https://mongoosejs.com/] - MongoDB object modeling for Node.js
•	(MongoDB Atlas)[https://www.mongodb.com/atlas] - Cloud database service

Tutorials & Guides
•	(RESTful API Design Best Practices )[https://restfulapi.net/]- REST API design principles
•	(MongoDB Query Operators )[https://www.mongodb.com/docs/manual/reference/operator/query/]- Database querying guide
•	(Express.js Routing Guide )[https://expressjs.com/en/guide/routing.html]- HTTP request routing
•	(Mongoose Schema Validation )[https://mongoosejs.com/docs/validation.html]- Data validation guide
Tools
•	(Postman )[https://www.postman.com/]- API testing and development
•	(MongoDB Compass )[https://www.mongodb.com/products/compass]- MongoDB GUI
•	(Nodemon )[https://nodemon.io/]- Development server auto-restart





  


