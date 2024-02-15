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
  return query
  
}

function searchHouses(req) {
  query = buildSearchQuery(req.body)
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

function editHouse(house, mls_num) {
  // Add mls number to end for where clause
  house.push(mls_num)

  return new Promise((resolve, reject) => {
    db.run("UPDATE houses SET \
      mls_num = ?, \
      street1 = ?, \
      street2 = ?, \
      city = ?, \
      state = ?, \
      zip_code = ?, \
      neighborhood = ?, \
      sales_price = ?, \
      date_listed = ?, \
      bedrooms = ?, \
      photos = ?, \
      bathrooms = ?, \
      garage_size = ?, \
      square_feet = ?, \
      lot_size = ?, \
      description = ? \
      WHERE mls_num = ?;",
          house,
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.changes)
            }
          })

  })
}

function addHouse(house) {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO houses ( \
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
          );",
          house,
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve(this.changes)
            }
          })

  })
}

function deleteHome(mls_num) {
  return new Promise((resolve, reject) => {
  db.all('DELETE FROM houses WHERE mls_num = ?;', mls_num, (err, rows) => {
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
    res.status(500).send(`Error: ${err}`);
  }
})

app.post('/homes', async (req, res) => {
  try {
    const houses = await searchHouses(req)
    res.json(houses);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error: ${err}`);
  }
})

app.post('/home', async (req, res) => {
  try {
    const changes = await addHouse(Object.values(req.body.formData))
    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error: ${err}`);
  }
})

app.patch('/home/:mls_num', async (req, res) => {
  let mls_num = req.params.mls_num;
  try {
    const changes = await editHouse(Object.values(req.body), mls_num)
    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error: ${err}`);
  }
})

app.delete('/home/:mls_num', async (req, res) => {
  let mls_num = req.params.mls_num;
  try {
    const changes = await deleteHome(mls_num)
    res.status(200).send('OK');
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error: ${err}`);
  }
})

app.post('/login/password', function(req, res, next) {
  passport.authenticate('local', function(err, user, info, status) {
    if (err) { 
      return res.status(500).send('An error occurred: ' + err.message); 
    }
    if (!user) { 
      return res.status(401).send('Authentication failed'); 
    }
    res.status(200).send('Authentication successful');
  })(req, res, next);
});


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})