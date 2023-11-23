# Mongoose Express CRUD - Backend

## Project Overview 

This project aims to develop a Node.js Express application using TypeScript as the programming language and integrating MongoDB with Mongoose for user data and order management. It ensures data integrity through validation using Zod.


## Key Features

+ Create, read, update, and delete (CRUD) operations for user management
+ Add new products to user orders
+ Retrieve all orders for a specific user
+ Calculate the total price of orders for a specific user

## Technologies

+ Node.js: JavaScript runtime environment
+ Express: Web application framework for Node.js
+ TypeScript: Superset of JavaScript with static typing
+ MongoDB: NoSQL database
+ Mongoose: Object Document Mapper (ODM) for MongoDB
+ Zod: Data validation libraries

# API Endpoints

## User Management

- Create a new user :
    - Endpoint `POST /api/users`
    - Request Body :

```json
{
    "userId": "number",
    "username": "string",
    "password": "string",
    "fullName": {
        "firstName": "string",
        "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": [
        "string",
        "string"
    ],
    "address": {
        "street": "string",
        "city": "string",
        "country": "string"
    }
}

 - Response: Newly created user object .
```

- Retrieve a list of all users:
  - Endpoint `GET /api/users`
  - Response: List of user objects.

- Retrieve a specific user by ID:
  - Endpoint `GET /api/users/:userId`
  - Response: User object.

- Update user information:
  - Endpoint `PUT /api/users/:userId`
  - Request Body: Updated user data
  - Response: Updated user object.

- Delete a user:
  - Endpoint `DELETE /api/users/:userId`
  - Response: Success message.

## Order Management
     - Add a new product to an order:
          - Endpoint `PUT /api/users/:userId/orders`
          - Request Body:

```json
{
    "productName": "string",
    "price": "number",
    "quantity": "number"
}

- Response: Success message.
```

- Retrieve all orders for a specific user:
   - Endpoint `GET /api/users/:userId/orders`
   - Response: List of order objects.

- Calculate the total price of orders for a specific user:
   - Endpoint `GET /api/users/:userId/orders/total-price`
   - Response: Total price of all orders.

## Error Handling 
### Error response will follow the following format:

```json
{
    "success": false,
    "message": "Error message",
    "error": {
        "code": 404,
        "description": "Error description"
    }
}
```

## Contribution
- Feel free to contribute to this project by reporting bugs, suggesting improvements, or submitting pull requests.

