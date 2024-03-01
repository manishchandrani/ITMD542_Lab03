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




