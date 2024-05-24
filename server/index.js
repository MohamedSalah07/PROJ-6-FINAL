const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json({ info: 'This is a Node/Express App' });
});

app.post('/activities', (req, res) => {
  let { type, duration } = req.body;

  if (type && duration) {
    console.log(`Logging a new activity: ${type} for ${duration} minutes`);
    res.json({ id: Date.now(), type, duration });
  } else {
    console.log("Error logging activity!");
    res.status(400).send("Error logging activity! Activities need a type and duration!");
  }
});

app.get('/activities', (req, res) => {
  let data = [
    { type: "Running", duration: 30 },
    { type: "Cycling", duration: 45 },
    { type: "Swimming", duration: 60 }
  ];
  res.json(data);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
