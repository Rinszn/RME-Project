import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "6LebGKcrAAAAAFSUkFGG2V_apBHAI6nnWDYhUR4z"; // from Google reCAPTCHA

app.post("/contact", async (req, res) => {
  const { name, email, message, token } = req.body;

  // Verify reCAPTCHA with Google
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${SECRET_KEY}&response=${token}`
  });

  const data = await response.json();

  if (!data.success) {
    return res.status(400).json({ success: false, error: "reCAPTCHA failed" });
  }

  console.log("✅ Verified Submission:", { name, email, message });
  res.json({ success: true });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
