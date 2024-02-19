const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/contact');
const contactUtils = require('../models/contactUtil');

// Route handler for displaying all contacts
router.get('/', (req, res) => {
  const contacts = contactUtils.readContactsFromFile();
  res.render('contacts/allcontacts', { contacts });
});

// Route handler for showing the form to create a new contact
router.get('/new', (req, res) => {
  res.render('contacts/new');
});

// Validation middleware
const validateContact = [
  body('firstName').trim().notEmpty().withMessage('Please fill out this field.'),
  body('lastName').trim().notEmpty().withMessage('Please fill out this field.'),
  body('emailAddress').optional().trim(),
  body('notes').optional().trim(),
];

// Route handler for handling the submission of a new contact form
router.post('/', validateContact, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('contacts/new', { errors: errors.array() });
  }

  const { firstName, lastName, emailAddress, notes } = req.body;

  const newContact = new Contact(firstName, lastName, emailAddress, notes);
  newContact.generateContactId();
  newContact.setDateTime();

  const contacts = contactUtils.readContactsFromFile();
  contactUtils.addContact(newContact, contacts);
  res.redirect('/contacts');
});


// Route handler for displaying a single contact
router.get('/:id', (req, res) => {
  const contacts = contactUtils.readContactsFromFile();
  const contactId = req.params.id;
  try {
    const contact = Contact.getContactById(contactId, contacts);
    res.render('contacts/detail', { contact });
  } catch (error) {
    console.error('Error retrieving contact:', error);
    res.status(404).send('Contact not found');
  }
});

// Route handler for editing a contact
router.get('/:id/editpage', (req, res) => {
  const contacts = contactUtils.readContactsFromFile();
  const contactId = req.params.id;
  try {
    const contact = Contact.getContactById(contactId, contacts);
    res.render('contacts/edit', { contact });
  } catch (error) {
    console.error('Error retrieving contact for editing:', error);
    res.status(404).send('Contact not found');
  }
});

// Route handler for updating an existing contact with validation
router.post('/:id/edit', validateContact, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const contactId = req.params.id;
    const contacts = contactUtils.readContactsFromFile();
    try {
      const contact = Contact.getContactById(contactId, contacts);
      return res.render('contacts/edit', { contact, errors: errors.array() });
    } catch (error) {
      console.error('Error retrieving contact for editing:', error);
      return res.status(404).send('Contact not found');
    }
  }

  const contactId = req.params.id;
  const { firstName, lastName, emailAddress, notes } = req.body;
  const updatedContact = new Contact(firstName, lastName, emailAddress, notes);
  updatedContact.generateContactId(); 
  updatedContact.setDateTime(); 
  const contacts = contactUtils.readContactsFromFile();
  contactUtils.updateContact(contactId, updatedContact, contacts);
  res.redirect(`/contacts`);
});


// Route handler for deleting a contact
router.post('/:id/delete', (req, res) => {
  const contactId = req.params.id;
  const deletionSuccessful = contactUtils.deleteContact(contactId);
  if (deletionSuccessful) {
    res.redirect('/contacts');
  } else {
    res.status(404).send('Contact not found');
  }
});






module.exports = router;
