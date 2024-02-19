const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const contactUtils = require('../models/contactUtil');

// Route handler for displaying all contacts
router.get('/', (req, res) => {
  const contacts = contactUtils.readContactsFromFile();
  res.render('contacts/index', { contacts });
});



module.exports = router;
