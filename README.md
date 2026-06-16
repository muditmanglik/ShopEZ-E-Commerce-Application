# ShopEZ – Full-Stack MERN E-Commerce Application

**ShopEZ** is a full-stack e-commerce web application built on the **MERN stack** (MongoDB, Express.js, React, Node.js). It provides a complete online shopping experience — from product browsing and filtering, to secure user authentication, cart management, order placement, and an admin dashboard for managing the catalog.

---

## Features

###  Customer Features
-  Register & Login with JWT-based authentication
-  Browse products across categories (Apparel, Shoes, Bags, Fragrances)
-  Add/Remove items from cart, adjust quantities
-  Checkout and place orders
-  View order history
-  Read customer reviews on product detail pages
-  Fully responsive design

###  Admin Features
-  Admin Dashboard for catalog management
-  Add,  Edit, Delete products
-  View all customer orders

---

## Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| **Frontend** | React 18, Vite, Tailwind CSS v4   |
| **Routing**  | React Router DOM v7               |
| **Icons**    | Lucide React                      |
| **Backend**  | Node.js, Express.js               |
| **Database** | MongoDB (via Mongoose ODM)        |
| **Auth**     | JSON Web Tokens (JWT), bcryptjs   |
| **Testing**  | Vitest, @testing-library/react    |
| **Dev Tools**| Nodemon, Concurrently, dotenv     |

---

## Project Structure

```
ShopEZ E-Commerce Application/
├── client/                         # Frontend Application (Vite + React)
│   ├── src/
│   │   ├── assets/                 # Images and static media
│   │   ├── components/             # Reusable UI components
│   │   │   ├── NavBar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Filters.jsx
│   │   │   └── PriceDetails.jsx
│   │   ├── pages/                  # Route-level page components
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── context/                # React Context (global state)
│   │   ├── routes/                 # React Router configuration
│   │   ├── styles/                 # Global CSS styles
│   │   ├── App.jsx                 # Root component
│   │   └── main.jsx                # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                         # Backend API Server (Node + Express)
    ├── config/                     # Database connection configuration
    ├── db/                         # Mongoose schema definitions
    │   ├── User.js
    │   └── Admin.js
    ├── models/                     # Data models
    ├── middleware/                  # JWT auth & admin guard middleware
    ├── controllers/                # Business logic controllers
    │   ├── authController.js
    │   ├── productController.js
    │   ├── categoryController.js
    │   ├── cartController.js
    │   └── orderController.js
    ├── routes/                     # Express REST API routes
    │   ├── auth.js
    │   ├── products.js
    │   ├── categories.js
    │   ├── cart.js
    │   └── orders.js
    ├── seed.js                     # Database seeding script
    ├── server.js                   # Express server entry point
    └── package.json
```

---

##  Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas cluster)
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/shopez-ecommerce.git
cd "ShopEZ E-Commerce Application"
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shopez
JWT_SECRET=your_jwt_secret_key_here
```

Seed the database with sample products, categories, and users:

```bash
npm run seed
```

Start the backend development server:

```bash
npm run dev
```

> The API server will run at `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

> The frontend will run at `http://localhost:5173`

---

##  API Endpoints

### Authentication
| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| POST   | `/api/auth/register` | Register a new user  |
| POST   | `/api/auth/login`    | Login and get JWT    |

### Products
| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | `/api/products`       | Get all products         |
| GET    | `/api/products/:id`   | Get product by ID        |
| POST   | `/api/products`       | Add a product *(Admin)*  |
| PUT    | `/api/products/:id`   | Update a product *(Admin)*|
| DELETE | `/api/products/:id`   | Delete a product *(Admin)*|

### Cart
| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| GET    | `/api/cart`      | View current cart      |
| POST   | `/api/cart`      | Add item to cart       |
| PUT    | `/api/cart/:id`  | Update cart item qty   |
| DELETE | `/api/cart/:id`  | Remove item from cart  |

### Orders
| Method | Endpoint        | Description        |
|--------|-----------------|--------------------|
| GET    | `/api/orders`   | Get user orders    |
| POST   | `/api/orders`   | Place a new order  |

---

##  Seeded Accounts

After running `npm run seed`, the following demo accounts are available:

| Role          | Email                    | Password        |
|---------------|--------------------------|-----------------|
| Customer      | `customer@shopez.com`    | `password123`   |
| Administrator | `admin@shopez.com`       | `adminpassword` |

---

##  Testing

Unit tests are written using **Vitest** and **@testing-library/react**.

```bash
cd client
npm run test
```

---

##  Architecture Overview

ShopEZ follows a **Model-View-Controller (MVC)** pattern on the backend:

- **Models** (`/db`, `/models`) — Mongoose schemas defining the data structure
- **Controllers** (`/controllers`) — Business logic handlers (auth, products, cart, orders)
- **Routes** (`/routes`) — Express routing layer mapping HTTP endpoints to controllers
- **Middleware** (`/middleware`) — JWT authentication and admin role verification

---

##  Acknowledgements

- [MongoDB](https://www.mongodb.com/) for the database
- [Express.js](https://expressjs.com/) for the backend framework
- [React](https://react.dev/) for the frontend framework
- [Node.js](https://nodejs.org/) for the runtime environment
- [Vite](https://vitejs.dev/) for the frontend build tool
- [Tailwind CSS](https://tailwindcss.com/) for styling
