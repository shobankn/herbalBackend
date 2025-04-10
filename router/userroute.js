const express = require('express');
const { submitContact, subscribeUser } = require('../controller/contactus');
let router = express.Router();



router.route('/contact').post(submitContact);
router.route('/subscribe').post(subscribeUser);

module.exports = router;