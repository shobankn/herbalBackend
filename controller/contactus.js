const sendNotificationEmail = require("../utils/sendEmail");
const Subscriber  = require('../model/subscriptionModel');
const nodemailer = require('nodemailer');

const submitContact = async (req, res) => {
  const { firstName, lastName, email, phone, countryCode, message, agreedToPolicy } = req.body;

  try {
    // Prepare contact data
    const contact = {
      firstName,
      lastName,
      email,
      phone,
      countryCode,
      message,
      agreedToPolicy
    };

    // Send notification email
    await sendNotificationEmail(contact);

    res.status(200).json({
      success: true,
      message: 'Thank you for contacting Herbal Homeo Wellness. We will get back to you shortly.'
    });

  } catch (error) {
    res.status(500).json({ error: true, message: error?.message || "Internal server error" });
  }
};


const subscribeUser = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    // Save to database
    const subscriber = await Subscriber.create({ email });

    // Send notification to admin
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER || 'shobankhan5598@gmail.com',
        pass: process.env.SMTP_PASS || ''
      }
    });

    const adminMailOptions = {
      from: `"Herbal Homeo Subscription" <newsletter@herbalhomeo.com>`,
      to: process.env.SMTP_USER || 'admin@herbalhomeo.com',
      subject: 'New Newsletter Subscriber',
      html: `
        <h3>New Newsletter Subscription</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subscribed At:</strong> ${subscriber.subscribedAt.toLocaleString()}</p>
      `
    };

    await transporter.sendMail(adminMailOptions);

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully. Thank you!'
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email already subscribed.' });
    }

    console.error('Subscription failed:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};





module.exports = { submitContact,subscribeUser };
