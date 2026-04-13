/**
 * Dark Hour Labs — Contact Form API
 * Vercel Serverless Function
 * 
 * Sends form submissions to info@darkhourlabs.io via Gmail SMTP.
 * Requires env vars: GMAIL_USER, GMAIL_APP_PASSWORD
 * 
 * POST /api/contact
 * Body: { name, email, service, message }
 */

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, service, message } = req.body || {};

  // Validate
  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Anti-spam: reject messages over 5000 chars
  if (message.length > 5000) {
    return res.status(400).json({ error: 'Message too long' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const subject = `New inquiry from ${name} — ${service}`;
    const body = `
New contact form submission from darkhourlabs.io

Name:    ${name}
Email:   ${email}
Service: ${service}

Message:
${message}

---
Sent via Dark Hour Labs contact form
    `.trim();

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'info@darkhourlabs.io',
      replyTo: email,
      subject,
      text: body,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err.message);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};