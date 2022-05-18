import express from 'express';
const app = express();

// CORS

const cors = require('cors');
app.use(cors());

// CSV Data

const fs = require('fs');
const csv = require('csv-parser');

let data: any[] = [];

fs.createReadStream('./data/instagram_influencers.csv')
  .pipe(csv())
  .on('data', (row: any) => {
    data.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

app.get('/', (req, res) => {
  res.send(data);
});

app.listen(3001, () => {
  console.log('Server is listening on port 3000');
});