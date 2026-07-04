const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Load Environment Variables
dotenv.config();

// Import Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const bookingRoutes = require("./routes/bookings");

// Create Express App
const app = express();


// =======================
// Security Middleware
// =======================

app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);


// =======================
// Rate Limiter
// =======================

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100, // Max 100 requests/IP
    message: {
        success: false,
        message: "Too many requests. Please try again later.",
    },
});

app.use(limiter);


// =======================
// Body Parser
// =======================

app.use(express.json());


// =======================
// Health Check Route
// =======================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Event Booking API is running 🚀",
    });
});


// =======================
// API Routes
// =======================

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);


// =======================
// 404 Route
// =======================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});


// =======================
// Database Connection
// =======================

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing in .env");
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error.message);
        process.exit(1);
    }
};

connectDB();