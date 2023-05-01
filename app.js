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
    id: '644f61b691adf64cad700c6f', // ID пользователя из mongo.
  };

  next();
});

// Данный адрес взят после подключения через терминал с помощью mongosh:
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
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
