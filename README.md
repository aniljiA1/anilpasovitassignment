# Clothing Brand E-Commerce Web App (MERN Stack)

## Overview
This is a full-stack e-commerce web application for a fictional clothing brand built using the **MERN stack** (MongoDB, Express.js, React, Node.js).  
The app allows users to browse products, register & login, manage a shopping cart, and complete a mock checkout process with order confirmation emails.

---

## Features


### 1. Product Management
- Clothing catalog with seeded products
- Each item includes: name, description, price, image URL, category (Men/Women/Kids), sizes (S/M/L/XL)
- Product detail page

### 2. Search, Filters & Pagination
- Search products by name or description
- Filter products by category, size, and price range (works together)
- Pagination support

### 3. Shopping Cart
- Add items with selected size
- Update quantities or remove items
- Cart is saved per user
- Add to cart even when not logged in

### 4. Checkout & Orders
- Mock checkout process
- Save orders in MongoDB with:
  - User reference
  - Items purchased (sizes & quantities)
  - Total price
  - Order date

### 5. Order Confirmation Email
- Sends an email after checkout using **Nodemailer**
- Email includes order summary, ID, and date

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Axios, Bootstrap  |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| Email | Nodemailer |

---

## Project Structure

frontend/
├─ package.json
├─ src/
│ ├─ index.js
│ ├─ App.jsx
│ ├─ pages/
│ │ ├─ Home.jsx
│ │ ├─ Product.jsx
│ │ ├─ ProductDetail.jsx
│ │ ├─ Cart.jsx
│ │ ├─ Checkout.jsx
│ │ └─ Auth.jsx
│ └─ utils/
│ └─ api.js
backend/
├─ package.json
├─ server.js
├─ routes/
│ ├─ auth.js
│ ├─ products.js
│ └─ orders.js
├─ models/
│ ├─ User.js
│ ├─ Product.js
│ └─ Order.js
└─ controllers/
├─ authController.js
├─ productController.js
└─ orderController.js


---

Sample Products
T-shirts, Hoodies, Jeans, Jackets, Dresses

20+ demo products seeded in backend

## Installation

### Backend

cd backend
npm install

Frontend

cd frontend
npm install

Environment Variables
Create a .env file in the backend:

PORT=5000
MONGO_URI=mongodb+srv://aniljiA1:anil12345@cluster0.9wr0ivl.mongodb.net/?appName=Cluster0
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=eeeanilkumar1995@gmail.com
EMAIL_PASS=Anil@123
FROM_EMAIL="Clothing Brand" <eeeanilkumar1995@gmail.com>

Environment Variables
Create a .env file in the frontend:
VITE_API_BASE=https://anilpasovitbackends.onrender.com

Running the App
Backend
npm start
or
npm run dev
or 
node server.js
Open browser at : http://localhost:5000
deploy: https://anilpasovitbackends.onrender.com/

Frontend

npm run dev
Open browser at: http://localhost:5173/

Deploy:
backend: https://anilpasovitbackends.onrender.com/
frontend: https://anilpasovitassignment-12.onrender.com/

live-deploy: https://anilpasovitassignment-12.onrender.com/

