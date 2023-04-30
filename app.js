const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.use((req, res, next) => {
  req.user = {
    id: '', // ID пользователя из постмана.
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/?directConnection=true')
  .then(() => {
    console.log('connected');
  })
  .catch(() => {
    console.log('error db connection');
  });

app.get('/', (req, res) => {
  res.send('hello !');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
