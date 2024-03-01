const fs = require('fs');
const Contact = require('./contact');
const path = require('node:path');
const betterSqlite3= require('better-sqlite3')

const db = new betterSqlite3(path.join(__dirname,'../data/contact-db.sqlite'), {verbose: console.log});

const createStmt = db.prepare(`
    CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        emailAddress TEXT,
        notes TEXT,
        dateTime TEXT
    )
`);


createStmt.run();


function readContactsFromDatabase() {
    const query = db.prepare('SELECT * FROM contacts');
    return query.all();
}

function addContactToDatabase(contact) {
    const insertStmt = db.prepare('INSERT INTO contacts (firstName, lastName, emailAddress, notes, dateTime) VALUES (?, ?, ?, ?, ?)');
    insertStmt.run(contact.firstName, contact.lastName, contact.emailAddress, contact.notes, contact.dateTime);
}

function getContactByIdFromDatabase(contactId) {
    const query = db.prepare('SELECT * FROM contacts WHERE id = ?');
    return query.get(contactId);
}

function updateContactInDatabase(contactId, updatedContact) {
    const updateStmt = db.prepare('UPDATE contacts SET firstName=?, lastName=?, emailAddress=?, notes=?, dateTime=? WHERE id=?');
    updateStmt.run(updatedContact.firstName, updatedContact.lastName, updatedContact.emailAddress, updatedContact.notes, updatedContact.dateTime, contactId);
}

function deleteContactFromDatabase(contactId) {
    const deleteStmt = db.prepare('DELETE FROM contacts WHERE id=?');
    deleteStmt.run(contactId);
}



module.exports = { readContactsFromDatabase, addContactToDatabase, getContactByIdFromDatabase, updateContactInDatabase, deleteContactFromDatabase};