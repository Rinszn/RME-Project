import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "6LebGKcrAAAAAFSUkFGG2V_apBHAI6nnWDYhUR4z"; // Google reCAPTCHA secret

// ✉️ Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // you can also use "smtp" with custom host/port
  auth: {
    user: "your-email@gmail.com", // 👉 replace with your Gmail
    pass: "your-app-password",    // 👉 use App Password, NOT your Gmail password
  },
});

app.post("/contact", async (req, res) => {
  const { name, email, message, token } = req.body;

  // ✅ Step 1: Verify reCAPTCHA
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${SECRET_KEY}&response=${token}`,
  });

  const data = await response.json();

  if (!data.success) {
    return res.status(400).json({ success: false, error: "reCAPTCHA failed" });
  }

  // ✅ Step 2: Send Email
  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "your-email@gmail.com", // 👉 where you want to receive messages
      subject: "New Contact Form Submission",
      text: `You got a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    console.log("📩 Email sent successfully!");
    res.json({ success: true });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
