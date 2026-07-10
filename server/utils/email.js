const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
  connectionTimeout: 10000,
});

// =======================
// Send OTP Email
// =======================
const sendOTPEmail = async (email, otp, type) => {
  try {
    const response = await transporter.sendMail({
      from: `"Eventora" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject:
        type === "account_verification"
          ? "Verify Your Account"
          : "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Eventora OTP Verification</h2>
          <p>Your One-Time Password (OTP) is:</p>

          <h1 style="color:#4F46E5;">${otp}</h1>

          <p>This OTP is valid for 10 minutes.</p>

          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    console.log("✅ OTP Email Sent");
    return response;
  } catch (error) {
    console.error("❌ OTP Email Error:", error);
    throw error;
  }
};

// =======================
// Send Booking Email
// =======================
const sendBookingEmail = async (userEmail, userName, eventTitle) => {
  try {
    const response = await transporter.sendMail({
      from: `"Eventora" <${process.env.EMAIL_FROM}>`,
      to: userEmail,
      subject: `Booking Confirmed - ${eventTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Hello ${userName} 👋</h2>

          <p>Your booking has been confirmed.</p>

          <h3>${eventTitle}</h3>

          <p>Thank you for booking with Eventora.</p>

          <br>

          <p>Have a wonderful event!</p>
        </div>
      `,
    });

    console.log("✅ Booking Email Sent");
    return response;
  } catch (error) {
    console.error("❌ Booking Email Error:", error);
    throw error;
  }
};

module.exports = {
  sendOTPEmail,
  sendBookingEmail,
};
