let ContactUs = require("../model/contactusModel");
const sendNotificationEmail = require("../utils/sendEmail");




const submitContact = async (req, res) => {
    const { firstName, lastName, email, phone, countryCode, message, agreedToPolicy } = req.body;

    try{

        // Create contact entry in database
    const contact = await ContactUs.create({
        firstName,
        lastName,
        email,
        phone,
        countryCode,
        message,
        agreedToPolicy
      });
    
      // Send notification email
      await sendNotificationEmail(contact);
    
      res.status(201).json({
        success: true,
        message: 'Thank you for contacting Herbal Homeo Wellness. We will get back to you shortly.',
        data: contact
      });

    }catch(error){
        res.status(500).json({error:true , message:error ||"internal server error"});

    }
  
    
  }








  module.exports = {submitContact}