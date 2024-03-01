const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const { body, validationResult } = require('express-validator');
const contactUtils = require('../models/contactUtilSQLite');

// Route handler for displaying all contacts
router.get('/', (req, res) => {
  const contacts = contactUtils.readContactsFromDatabase();
  res.render('contacts/allcontacts', { contacts });
});

// Route handler for showing the form to create a new contact
router.get('/new', (req, res) => {
  res.render('contacts/new');
});

// Validation middleware
const validateContact = [
  body('firstName').trim().notEmpty().withMessage('First Name required').escape(),
  body('lastName').trim().notEmpty().withMessage('Last Name required').escape(),
  body('emailAddress').optional().trim().escape(),
  body('notes').optional().trim().escape(),
];

// Route handler for handling the submission of a new contact form
router.post('/', validateContact, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('contacts/new', { msg: errors.array() });
  }

  const { firstName, lastName, emailAddress, notes } = req.body;

  const newContact = new Contact(firstName, lastName, emailAddress, notes);
  newContact.generateContactId();
  newContact.setDateTime();

  contactUtils.addContactToDatabase(newContact);
  res.redirect('/contacts');
});

// Route handler for editing a contact
router.get('/:id/editpage', (req, res) => {
  const contactId = req.params.id;
  const contact = contactUtils.getContactByIdFromDatabase(contactId);
  if (!contact) {
    return res.status(404).send('Contact not found');
  }
  res.render('contacts/edit', { contact });
});

// Route handler for updating an existing contact with validation
router.post('/:id/edit', validateContact, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const contactId = req.params.id;
    const contact = contactUtils.getContactByIdFromDatabase(contactId);
    return res.render('contacts/edit', { contact, msg: errors.array() });
  }

  const contactId = req.params.id;
  const { firstName, lastName, emailAddress, notes } = req.body;
  const updatedContact = new Contact(firstName, lastName, emailAddress, notes);
  updatedContact.setDateTime();
  contactUtils.updateContactInDatabase(contactId, updatedContact);
  res.redirect(`/contacts`);
});

module.exports = router;
