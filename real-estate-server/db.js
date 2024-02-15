const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/realestate.db');
var crypto = require('crypto');

// based on the example found here: https://github.com/passport/todos-express-password/blob/master/db.js

function createUser(username, password) {
    let salt = crypto.randomBytes(16);
    db.run('INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
        username,
        crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256'),
        salt
      ]);
}

function createSampleHouse() {
    db.run("INSERT OR IGNORE INTO houses ( \
        mls_num, \
        street1, \
        street2, \
        city, \
        state, \
        zip_code, \
        neighborhood, \
        sales_price, \
        date_listed, \
        bedrooms, \
        photos, \
        bathrooms, \
        garage_size, \
        square_feet, \
        lot_size, \
        description) \
            VALUES ( \
                ?,  \
                ?, \
                ?, \
                ?, \
                ?, \
                ?, \
                ?, \
                ?, \
                ?, \
                ?, \
                ?, \
                ?, \
                ?, \
                ?, \
                ?, \
                ? \
            );", [
                2,
                "2123 Main St",
                "",
                "Anytown",
                "TX",
                12345,
                "Anytown Neighborhood",
                100000,
                "2021-01-01",
                3,
                "photo1.jpg,photo2.jpg",
                2,
                2,
                1500,
                0.25,
                "A great house in a great neighborhood"
            ]
    )
}

db.serialize(() => {
    // Create the database schema for the real estate app
    db.run("CREATE TABLE IF NOT EXISTS users ( \
        id INTEGER PRIMARY KEY, \
        username TEXT UNIQUE, \
        hashed_password BLOB, \
        salt BLOB \
    )");

    db.run("CREATE TABLE IF NOT EXISTS houses ( \
        mls_num TEXT PRIMARY KEY, \
        street1 TEXT, \
        street2 TEXT, \
        city TEXT, \
        state TEXT, \
        zip_code TEXT, \
        neighborhood TEXT, \
        sales_price TEXT, \
        date_listed TEXT, \
        bedrooms INTEGER, \
        photos TEXT, \
        bathrooms TEXT, \
        garage_size TEXT, \
        square_feet TEXT, \
        lot_size TEXT, \
        description TEXT \
    );")

    createUser("admin", "password")

    // This should be removed in production, but is here to populate the database with a sample house
    createSampleHouse()

})

module.exports = db;