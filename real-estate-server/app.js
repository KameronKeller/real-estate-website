const express = require('express')
const cors = require('cors')
const db = require('./db');
const passport = require('passport');
const LocalStrategy = require('passport-local');
var session = require('express-session');
var crypto = require('crypto');

var SQLiteStore = require('connect-sqlite3')(session);
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './db/' })
}));
app.use(passport.authenticate('session'));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, row);
    });
  });
}));



function fetchHouses() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM houses;', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function buildSearchQuery(requestBody) {
  let searchFields = [
    'mls_num',
    'city',
    'state',
    'zip_code',
    'bedrooms',
    'bathrooms',
    'square_feet'
  ]  
  let query = 'SELECT * FROM houses WHERE';
  let isFirst = true

  for (var i = 0; i < searchFields.length; i++) {
    field = searchFields[i];
    if (requestBody[field]) {

      // If it's the first search term added to the query, AND is not needed
      if (isFirst) {
        query += ` (${field} LIKE ?)`
      } else {
        query += ` AND (${field} LIKE ?)` 
      }
      isFirst = false;
    }
  }
  query += ";";
  console.log(query)
  return query
  
}

function searchHouses(req) {
  query = buildSearchQuery(req.body)
  console.log(Object.values(req.body))
  return new Promise((resolve, reject) => {
    db.all(query, Object.values(req.body), (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

app.get('/homes', async (req, res) => {
  try {
    const houses = await fetchHouses();
    res.json(houses);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
})

app.post('/homes', async (req, res) => {
  try {
    const houses = await searchHouses(req)
    console.log(houses)
    res.json(houses);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong');
  }
})



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})