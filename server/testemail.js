// testEmail.js
const { Resend } = require("resend");

const resend = new Resend("re_TW4hBXuf_KDDrKLnSycdrHSuMx5Lf5xew");

const testEmail = async () => {
  try {
    const response = await resend.emails.send({
      from: "Eventora <onboarding@resend.dev>",
      to: "js24155678@gmail.com", // put your email
      subject: "Test Email",
      html: "<h1>Hello! Resend is working 🚀</h1>",
    });

    console.log("SUCCESS:", response);
  } catch (err) {
    console.log("ERROR:", err);
  }
};

testEmail();