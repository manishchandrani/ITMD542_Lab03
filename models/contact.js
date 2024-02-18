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



}

module.exports = Contact;
