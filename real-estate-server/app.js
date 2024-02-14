const express = require('express')
const app = express()
const port = 3000

// setup the database

// setup authentication database

// async function getAllHomes() {
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

// }
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

app.get('/', (req, res) => {
  res.send('Hello World!')
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
  console.log(`Example app listening on port ${port}`)
})