const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  countryCode: {
    type: String,
    default: 'PK',
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true
  },
  agreedToPolicy: {
    type: Boolean,
    required: [true, 'You must agree to our privacy policy']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

 const ContactUs =  mongoose.model('Contact', ContactSchema);
 module.exports = ContactUs;