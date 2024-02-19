const { randomUUID } = require('crypto');

class Contact {
    constructor(firstName, lastName, emailAddress, notes) {
        this.id = null; // ID will be generated when adding a contact
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.notes = notes;
        this.dateTime = null; // Date/time will be set when adding a contact
    }
    // Method to generate a unique contact ID
    generateContactId() {
        this.id = randomUUID();
    }

    // Method to set the date/time when the contact is created or last edited
    setDateTime() {
        const date = new Date();
        this.dateTime = date.toLocaleString('en-US');
    }

    // Method to retrieve a contact by ID
    static getContactById(contactId, contacts) {
        const contact = contacts.find(contact => contact.id === contactId);
        if (!contact) {
            throw new Error(`Contact with ID ${contactId} not found.`);
        }
        return contact;
    }

}

module.exports = Contact;
