const express = require('express')
const cors = require('cors')
const db = require('./db');
const app = express()
const port = 3000

// setup the database

// setup authentication database

app.use(cors())
app.use(express.json());

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