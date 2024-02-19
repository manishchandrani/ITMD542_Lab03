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

// Function to write contact data to JSON file
function writeContactsToFile(contacts) {
    try {
        fs.writeFileSync(CONTACTS_FILE_PATH, JSON.stringify(contacts, null, 2));
    } catch (error) {
        console.error('Error writing contacts to file:', error);
    }
}

// Function to save contacts data to file whenever it is modified
function saveContactsToFileSystem(contacts) {
    writeContactsToFile(contacts);
}


module.exports = { saveContactsToFileSystem, readContactsFromFile};