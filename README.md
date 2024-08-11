# User Registration System

## Project Overview
This project is a full-stack user registration system with both front-end (React.js) and back-end (Node.js with Express) components. It includes user registration, authentication, and CRUD operations, with data stored in MongoDB.

## Prerequisites
- Node.js version >= 20
- MongoDB
- npm (Node Package Manager)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Devansh-Kushwah/User-Registration.git
cd User-Registration
```

### 2.  Backend Setup
Navigate to the `backend` directory and install dependencies:
```bash
cd backend
npm install
npm install -g nodemon
npm start
```

### 3. Backend Setup
Navigate to the `frontend` directory and install dependencies:
```bash
cd frontend
npm install
npm start
```

Here is the API documentation for the user registration system you have developed:

---

# User Registration API Documentation

## Base URL
```
http://localhost:8080
```

## Endpoints

### 1. **User Signup**
- **URL:** `/auth/signup`
- **Method:** `POST`
- **Description:** Registers a new user in the system.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "age": 25,
    "dateOfBirth": "1998-01-01",
    "gender": "Male",
    "about": "A brief description about the user."
  }
  ```
- **Response:**
  - **Success:** `201 Created`
    ```json
    {
      "message": "Signup successfully",
      "success": true
    }
    ```
  - **Failure:** `400 Bad Request`, `409 Conflict`, `500 Internal Server Error`
    ```json
    {
      "message": "User already exists, you can login",
      "success": false
    }
    ```
    ```json
    {
      "message": "Internal server error",
      "success": false
    }
    ```

### 2. **User Login**
- **URL:** `/auth/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePass123"
  }
  ```
- **Response:**
  - **Success:** `200 OK`
    ```json
    {
      "message": "Login Success",
      "success": true,
      "jwtToken": "jwt_token_here",
      "data": {
        "name": "John Doe",
        "email": "john@example.com",
        "age": 25,
        "dateOfBirth": "1998-01-01T00:00:00.000Z",
        "gender": "Male",
        "about": "A brief description about the user."
      }
    }
    ```
  - **Failure:** `400 Bad Request`, `401 Unauthorized`, `500 Internal Server Error`
    ```json
    {
      "message": "Auth failed email or password is wrong",
      "success": false
    }
    ```
    ```json
    {
      "message": "Internal server error",
      "success": false
    }
    ```

### 3. **Fetch User Details**
- **URL:** `/users/fetchUserDetails`
- **Method:** `GET`
- **Description:** Fetches details of the authenticated user.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Response:**
  - **Success:** `200 OK`
    ```json
    {
      "message": "User details fetched successfully",
      "success": true,
      "data": {
        "name": "John Doe",
        "age": 25,
        "dateOfBirth": "1998-01-01T00:00:00.000Z",
        "gender": "Male",
        "about": "A brief description about the user."
      }
    }
    ```
  - **Failure:** `401 Unauthorized`, `404 Not Found`, `500 Internal Server Error`
    ```json
    {
      "message": "User not found",
      "success": false
    }
    ```
    ```json
    {
      "message": "Internal server error",
      "success": false
    }
    ```

### 4. **Update User Profile**
- **URL:** `/users/updateProfile`
- **Method:** `POST`
- **Description:** Updates the profile information of the authenticated user.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**
  ```json
  {
    "name": "John Updated",
    "age": 26,
    "dateOfBirth": "1997-01-01",
    "gender": "Male",
    "about": "An updated description about the user."
  }
  ```
- **Response:**
  - **Success:** `200 OK`
    ```json
    {
      "message": "Profile updated successfully",
      "success": true,
      "data": {
        "name": "John Updated",
        "age": 26,
        "dateOfBirth": "1997-01-01T00:00:00.000Z",
        "gender": "Male",
        "about": "An updated description about the user."
      }
    }
    ```
  - **Failure:** `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `500 Internal Server Error`
    ```json
    {
      "message": "User not found",
      "success": false
    }
    ```
    ```json
    {
      "message": "Internal server error",
      "success": false
    }
    ```

### 5. **Delete User**
- **URL:** `/users/deleteUser`
- **Method:** `DELETE`
- **Description:** Deletes the authenticated user from the system.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Response:**
  - **Success:** `200 OK`
    ```json
    {
      "message": "User deleted successfully",
      "success": true
    }
    ```
  - **Failure:** `401 Unauthorized`, `404 Not Found`, `500 Internal Server Error`
    ```json
    {
      "message": "User not found",
      "success": false
    }
    ```
    ```json
    {
      "message": "Internal server error",
      "success": false
    }
    ```
    
## Database Design
The database is designed using MongoDB with a collection to store user information. The structure is as follows:
- **Users Collection:**
  - `name` (String)
  - `email` (String)
  - `password` (String)
  - `age` (Number)
  - `dateOfBirth` (Date)
  - `gender` (String)
  - `about` (String)

## Error Handling
The system includes comprehensive error handling, returning appropriate HTTP status codes such as `400 Bad Request`, `401 Unauthorized`, `404 Not Found`, and `500 Internal Server Error`.
