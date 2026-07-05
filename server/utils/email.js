const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Booking Confirmed: ${eventTitle}`,
      html: `
        <h2>Hi ${userName}!</h2>
        <p>Your booking for the event <strong>${eventTitle}</strong> is successfully confirmed.</p>
        <p>Thank you for choosing Eventora.</p>
      `,
    };
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", userEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const sendOTPEmail = async (email, otp, type) => {
  console.log("🔥 EMAIL FUNCTION CALLED", email, otp, type);

  try {
    const result = await resend.emails.send({
      from: "Eventora <onboarding@resend.dev>",
      to: email,
      subject: "OTP Verification",
      html: `<h1>Your OTP is ${otp}</h1>`,
    });

    console.log("✅ RESEND RESPONSE:", result);
  } catch (err) {
    console.log("❌ RESEND ERROR:", err);
  }
};

module.exports = { sendBookingEmail, sendOTPEmail };
