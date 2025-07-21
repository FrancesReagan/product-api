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


