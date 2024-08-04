# E-Commerce Application API

Welcome to the E-Commerce API repository! This project is a full-featured eCommerce application built using the MERN stack (MongoDB, Express, React, Node.js). This robust api includes storefront, admin panel for managing products, orders, and users.

## Table of Contents

- [E-Commerce Application API](#e-commerce-application-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Contributing](#contributing)
  - [From scratch to kick-start](#from-scratch-to-kick-start)
  - [License](#license)
  - [Contact](#contact)

## Features

- User authentication and authorization
- Product listing, search, and filtering
- Shopping cart and checkout process
- Order management
- User profile management
- Admin panel for managing products, orders, and users
- Responsive design

## Technologies

- **Backend API**: Typescript, Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Stripe

## Installation

### Prerequisites

- Node.js
- MongoDB
- npm

### Steps

1. **Clone the repository**
    ```sh
    git clone https://github.com/ostrich-white/e-commerce-api.git
    cd e-commerce-api
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Configure environment variables**

    Create a `.env` file in the `backend` directory and add the following:
    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongo_db_uri
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    ```

4. **Run the application**
    ```sh
    npm run dev
    ```

    The application should now be running on `http://localhost:5000` (backend).

## Contributing

We welcome contributions to this project! To contribute, follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

## From scratch to kick-start

1. Add `.gitignore`
   ```
    node_modules
    dist

    *.env
   ```

2. Initialize packages.
   ```sh
    npm init -y
    npm i express typescript @types/express @types/node
   ```

3. Initialize typescript compiler.
   ```sh
    npx tsc --init
   ```

   Change the outDir to ./dist on the `tsconfig.json`

4. Install nodemon as dev dependencies.
   ```sh
    npm i -D nodemon
   ```

5. Install some dependencies.
   ```sh
    npm i rimraf concurrently
   ```

6. Add some scripts on package.json.
   ```json
    "scripts": {
      "build": "rimraf dist && npx tsc",
      "prestart": "npm run build",
      "start": "node dist/index.js",
      "preserve": "npm run build",
      "serve": "concurrently \"npx tsc -w\" \"nodemon dist/index.js\""
    },
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, feel free to contact us at:
- **GitHub Issues**: [Create an Issue](https://github.com/yourusername/ecommerce-app/issues)

Thank you for using our E-Commerce Application!
