const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const contactUtils = require('../models/contactUtil');

// Route handler for displaying all contacts
router.get('/', (req, res) => {
  const contacts = contactUtils.readContactsFromFile();
  res.render('contacts/index', { contacts });
});

// Route handler for showing the form to create a new contact
router.get('/new', (req, res) => {
  res.render('contacts/new');
});


module.exports = router;
