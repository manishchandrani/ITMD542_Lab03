const fs = require('fs');
const Contact = require('./contact');

const CONTACTS_FILE_PATH = 'contacts.json';

// Function to read contact data from JSON file
function readContactsFromFile() {
    try {
        const data = fs.readFileSync(CONTACTS_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading contacts from file:', error);
        return [];
    }
}


