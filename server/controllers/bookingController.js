const Booking = require("../models/Booking");
const Event = require("../models/Event");
const OTP = require("../models/OTP");
const { sendBookingEmail, sendOTPEmail } = require("../utils/email");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/**
 * =========================
 * SEND BOOKING OTP
 * =========================
 */
exports.sendBookingOTP = async (req, res) => {
  try {
    const otp = generateOTP();

    // Remove old OTP
    await OTP.findOneAndDelete({
      email: req.user.email,
      action: "event_booking",
    });

    // Save new OTP
    await OTP.create({
      email: req.user.email,
      otp,
      action: "event_booking",
    });

    // 🔥 FIX: send email in background (DO NOT await)
    sendOTPEmail(req.user.email, otp, "event_booking")
      .then(() => console.log("Booking OTP email sent"))
      .catch((err) => console.log("Email error:", err));

    return res.json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error sending OTP",
      error: error.message,
    });
  }
};

/**
 * =========================
 * BOOK EVENT (OTP VERIFY)
 * =========================
 */
exports.bookEvent = async (req, res) => {
  try {
    const { eventId, otp } = req.body;

    // Verify OTP
    const validOTP = await OTP.findOne({
      email: req.user.email,
      otp,
      action: "event_booking",
    });

    if (!validOTP) {
      return res.status(400).json({
        message: "Invalid or expired OTP for booking",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }

    const existingBooking = await Booking.findOne({
      userId: req.user.id,
      eventId,
    });

    if (existingBooking && existingBooking.status !== "cancelled") {
      return res.status(400).json({
        message: "Already booked or pending",
      });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      eventId,
      status: "pending",
      paymentStatus: "not_paid",
      amount: event.ticketPrice,
    });

    // Delete OTP after use
    await OTP.deleteOne({ _id: validOTP._id });

    return res.status(201).json({
      message: "Booking request submitted",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * =========================
 * CONFIRM BOOKING (ADMIN)
 * =========================
 */
exports.confirmBooking = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id)
      .populate("userId")
      .populate("eventId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "confirmed") {
      return res.status(400).json({
        message: "Booking is already confirmed",
      });
    }

    const event = await Event.findById(booking.eventId._id);

    if (!event || event.availableSeats <= 0) {
      return res.status(400).json({
        message: "No seats available to confirm this booking",
      });
    }

    booking.status = "confirmed";

    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
    }

    await booking.save();

    event.availableSeats -= 1;
    await event.save();

    // 🔥 FIX: email in background (DO NOT await)
    sendBookingEmail(
      booking.userId.email,
      booking.userId.name,
      booking.eventId.title,
    ).catch((err) => console.log("Email error:", err));

    return res.json({
      message: "Booking confirmed successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * =========================
 * GET BOOKINGS
 * =========================
 */
exports.getMyBookings = async (req, res) => {
  try {
    const bookings =
      req.user.role === "admin"
        ? await Booking.find()
            .populate("eventId")
            .populate("userId", "name email")
            .sort({ createdAt: -1 })
        : await Booking.find({ userId: req.user.id })
            .populate("eventId")
            .sort({ createdAt: -1 });

    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * =========================
 * CANCEL BOOKING
 * =========================
 */
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (
      booking.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Already cancelled" });
    }

    const wasConfirmed = booking.status === "confirmed";

    booking.status = "cancelled";
    await booking.save();

    if (wasConfirmed) {
      const event = await Event.findById(booking.eventId);

      if (event) {
        event.availableSeats += 1;
        await event.save();
      }
    }

    return res.json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
