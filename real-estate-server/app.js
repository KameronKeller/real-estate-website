const express = require('express')
const app = express()
const port = 3000

// setup the database

// setup authentication database

// async function getAllHomes() {

// }

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
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})