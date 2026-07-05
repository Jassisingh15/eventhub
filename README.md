# 🎟️ Eventora - Full-Stack Event Booking Platform

Eventora is a modern full-stack MERN application that enables users to discover events, register securely, and book tickets through a robust authentication and approval workflow. It includes a powerful admin dashboard for managing events, reviewing booking requests, and tracking platform analytics.

The project demonstrates production-level backend concepts including JWT authentication, role-based authorization, OTP verification, protected APIs, secure booking workflows, and transactional email integration.

---

# ✨ Features

## 🔐 Authentication & Security

- Secure user registration and login using JWT Authentication.
- Password hashing with bcrypt.
- Email-based OTP verification for new account activation.
- Automatic OTP resend for unverified users during login.
- Protected API routes using authentication middleware.
- Role-Based Access Control (RBAC) for Admin and User accounts.

---

## 👤 User Features

- Browse upcoming events.
- View complete event details.
- Book free or paid events.
- OTP verification before confirming bookings.
- View booking history and booking status.
- Cancel pending bookings.
- Receive booking confirmation emails.

---

## 👨‍💼 Admin Features

- Secure Admin Dashboard.
- Create new events.
- Edit existing events.
- Delete events.
- Manage all booking requests.
- Approve or reject bookings.
- Mark bookings as Paid or Unpaid.
- Track event capacity automatically.
- View platform analytics including:
  - Total Events
  - Total Users
  - Pending Bookings
  - Confirmed Bookings
  - Total Revenue

---

## 🎫 Smart Booking System

- Prevents overbooking using seat availability validation.
- Booking requests remain **Pending** until approved by an administrator.
- Supports both free and paid events.
- OTP verification adds an additional security layer before booking confirmation.

---

## 📧 Email Notifications

Eventora uses **Resend** for transactional email delivery.

The application automatically sends:

- Account Verification OTP
- Booking Confirmation Email

### Development Note

The current deployment uses Resend's free testing mode.

Therefore, emails can only be delivered to the verified email address associated with the Resend account.

For production deployments, verifying a custom domain allows emails to be sent to every registered user.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Resend API

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

# 📂 Project Structure

```
Eventora
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── config
│   └── server.js
│
└── README.md
```

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone <repository-url>
cd Eventora
```

---

## 2. Install Dependencies

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd client
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file inside the `server` directory.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
CLIENT_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
```

---

## 4. Run the Backend

```bash
cd server
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

## 5. Run the Frontend

```bash
cd client
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

# 🔒 API Features

- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Email OTP Verification
- Event CRUD Operations
- Booking CRUD Operations
- Admin Approval Workflow
- Secure Password Hashing
- MongoDB Integration
- Email Notifications

---

# 🌐 Deployment

The application is deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

# 📸 Screenshots

You can add screenshots of:

- Home Page
- Login Page
- Registration Page
- OTP Verification
- User Dashboard
- Admin Dashboard
- Event Details
- Booking Page

---

# 💡 Future Improvements

- Payment Gateway Integration (Stripe/Razorpay)
- QR Code Ticket Generation
- Event Search & Filters
- Event Categories
- User Profile Management
- Password Reset via Email
- Google Authentication
- Real-time Notifications
- Event Reviews & Ratings

---

# 👨‍💻 Learning Outcomes

This project demonstrates practical experience with:

- Full-Stack MERN Development
- REST API Design
- Authentication & Authorization
- Secure OTP Verification
- MongoDB Data Modeling
- Protected Routes
- Email Integration using Resend
- Deployment on Vercel & Render
- Production-ready Backend Architecture

---

# 📄 License

This project is developed for educational purposes and portfolio demonstration.
