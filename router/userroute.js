const express = require('express');
const { submitContact } = require('../controller/contactus');
let router = express.Router();



router.route('/contact').post(submitContact);

module.exports = router;