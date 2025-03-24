const nodemailer = require('nodemailer');
  
  // Helper function to send notification email
  const sendNotificationEmail = async (contact) => {
    // Create transporter (configure with your SMTP settings in production)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER || 'shobankhan5598@gmail.com',
        pass: process.env.SMTP_PASS || ''
      }
    });
  
    // Email to admin
    const adminMailOptions = {
      from: `"Herbal Homeo Contact" <contact@herbalhomeo.com>`,
      to: process.env.SMTP_USER || 'admin@herbalhomeo.com',
      subject: `New Contact Form Submission from ${contact.firstName} ${contact.lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> +${contact.countryCode} ${contact.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${contact.message}</p>
        <p><strong>Submitted at:</strong> ${contact.createdAt}</p>
      `
    };
  
    // Auto-reply to customer
    const customerMailOptions = {
      from: `"Herbal Homeo Wellness" <noreply@herbalhomeo.com>`,
      to: contact.email,
      subject: 'Thank you for contacting Herbal Homeo Wellness',
      html: `
        <h2>Thank you for reaching out to us!</h2>
        <p>Dear ${contact.firstName},</p>
        <p>We have received your message and appreciate your interest in Herbal Homeo Wellness.</p>
        <p>Our team will review your inquiry and get back to you as soon as possible, usually within 24-48 hours.</p>
        <p>For urgent matters, please call our customer service at +92 312 345 6789.</p>
        <p>Best regards,</p>
        <p>The Herbal Homeo Wellness Team</p>
      `
    };
  
    try {
      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(customerMailOptions);
    } catch (error) {
      console.error('Email notification failed:', error);
    }}

    module.exports = sendNotificationEmail;