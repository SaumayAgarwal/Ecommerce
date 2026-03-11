# E-Commerce Application

A full-stack e-commerce application with Spring Boot backend and React frontend.

## Features

### Backend
- User authentication with JWT
- Role-based access control (USER and ADMIN)
- Product management
- Shopping cart functionality
- Order placement with shipping address
- Order history

### Frontend
- User registration with role selection (USER/ADMIN)
- Login/Logout
- Product browsing with search and pagination
- Shopping cart with quantity management
- Checkout with shipping address form
- Order history view
- Admin product management (CRUD operations)

## Tech Stack

### Backend
- Java 21
- Spring Boot 4.0.2
- Spring Security with JWT
- Spring Data JPA
- MySQL Database
- Lombok
- Maven

### Frontend
- React 18
- Vite
- React Router
- Axios
- JWT Decode

## Setup Instructions

### Prerequisites
- Java 21
- Maven
- Node.js 18+
- MySQL 8.0+

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE ecommerce;
```

2. Update `src/main/resources/application.properties` with your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### Backend Setup

1. Navigate to the project root directory
2. Build the project:
```bash
./mvnw clean install
```

3. Run the Spring Boot application:
```bash
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## Usage

### Register a New User

1. Go to `http://localhost:3000/register`
2. Fill in the registration form:
   - Full Name
   - Email
   - Password
   - Address (required for shipping)
   - Role (USER or ADMIN)
3. Click Register

### Admin Features

If you register as ADMIN:
- Access the "Manage Products" page
- Add new products with name, description, price, stock, category, and image URL
- Edit existing products
- Delete products

### User Features

If you register as USER:
- Browse all products
- Search for products
- Add products to cart
- View and manage cart
- Proceed to checkout
- Enter shipping address during checkout
- Place orders
- View order history with shipping addresses

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login

### Products
- `GET /api/products` - Get all products (paginated)
- `GET /api/products/search` - Search products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Add product (ADMIN only)
- `PUT /api/products/{id}` - Update product (ADMIN only)
- `DELETE /api/products/{id}` - Delete product (ADMIN only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/{id}` - Update cart item quantity
- `DELETE /api/cart/{id}` - Remove item from cart

### Orders
- `POST /api/orders` - Place order (with shippingAddress parameter)
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get order by ID

## Key Changes from Original Backend

1. Added `address` field to User entity
2. Added `shippingAddress` field to Order entity
3. Updated DTOs to include address fields
4. Modified `placeOrder()` to require shipping address parameter
5. Implemented GlobalExceptionHandler for centralized error handling

## Notes

- JWT tokens expire after 1 hour
- All authenticated endpoints require Bearer token in Authorization header
- Admin users can only manage products, not place orders
- User addresses are stored during registration and can be used as default shipping address
- Orders must include a shipping address at checkout
