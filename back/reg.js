const express = require('express');
const router = express.Router();
const User = require('./models/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Load environment variables
require('dotenv').config();

// Setup your email transporter using Gmail credentials from .env file
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Email from .env
    pass: process.env.GMAIL_PASS  // App password from .env
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the user's password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the status set to 'pending'
    const user = new User({ email, password: hashedPassword });
    await user.save();

    // Send email to admin for approval
    const approveLink = `http://yourdomain.com/admin/approve/${user._id}`;
    const rejectLink = `http://yourdomain.com/admin/reject/${user._id}`;

    const mailOptions = {
      from: process.env.GMAIL_USER, // From .env file
      to: process.env.GMAIL_USER,   // Send to yourself for approval
      subject: 'New user registration approval needed',
      html: `
        <p>New user registered: ${email}</p>
        <p>Approve: <a href="${approveLink}">Approve</a></p>
        <p>Reject: <a href="${rejectLink}">Reject</a></p>
      `
    };

    // Send the email for approval
    await transporter.sendMail(mailOptions);

    res.send('Registration successful! Waiting for admin approval.');
  } catch (error) {
    res.status(500).send('Error registering user.');
  }
});

module.exports = router;
