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

// Route handler for handling the submission of a new contact form
router.post('/', (req, res) => {
  const { firstName, lastName, emailAddress, notes } = req.body;
  const sanitizedFirstName = firstName.trim();
  const sanitizedLastName = lastName.trim();
  const sanitizedEmailAddress = emailAddress.trim();
  const sanitizedNotes = notes.trim();

  if (!sanitizedFirstName || !sanitizedLastName) {
    res.status(400).send('First Name and Last Name are required');
    return;
  }

  const newContact = new Contact(sanitizedFirstName, sanitizedLastName, sanitizedEmailAddress, sanitizedNotes);
  newContact.generateContactId();
  newContact.setDateTime();

  const contacts = contactUtils.readContactsFromFile(); // Read contacts from file
  contactUtils.addContact(newContact, contacts); // Pass contacts array to addContact function
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

// Route handler for updating an existing contact
router.post('/:id/edit', (req, res) => {
  const contactId = req.params.id;
  const { firstName, lastName, emailAddress, notes } = req.body;

  const updatedContact = new Contact(firstName, lastName, emailAddress, notes);
  updatedContact.generateContactId();
  updatedContact.setDateTime();

  const contacts = contactUtils.readContactsFromFile();
  contactUtils.updateContact(contactId, updatedContact, contacts);
  res.redirect(`/contacts/${contactId}`);
});





module.exports = router;
