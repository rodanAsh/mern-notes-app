# 📝 MERN Notes App

A full-stack Notes Management Application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and secured with JWT-based authentication.

🌐 Live Demo
https://notely-zeta.vercel.app/

## 🚀 Features

- User Registration & Login with JWT Authentication
- Create, Edit, and Delete Notes
- Protected Routes for both Frontend and Backend
- Responsive UI using Tailwind CSS.
- Secure access to personal notes (user-specific data isolation)
- RESTful API structure with proper error handling

## 🖥️ Tech Stack

**Frontend:**
- React.js
- React Router
- Axios
- Tailwind CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for Authentication
- dotenv for environment variables

## 🔐 Authentication Flow

- JWT is generated upon successful login/signup.
- Token is stored in the browser (localStorage or cookie).
- Axios sends the token in the `Authorization` header for protected routes.
- Express middleware verifies the token and allows access to protected API endpoints.


