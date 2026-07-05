const { Resend } = require("resend");
const dotenv = require("dotenv");

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

// =======================
// Send OTP Email
// =======================
const sendOTPEmail = async (email, otp, type) => {
  try {
    const response = await resend.emails.send({
      from: "Eventora <onboarding@resend.dev>", // Change after verifying your own domain
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

    console.log("✅ OTP Email Sent:", response);
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
    const response = await resend.emails.send({
      from: "Eventora <onboarding@resend.dev>",
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

    console.log("✅ Booking Email Sent:", response);
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