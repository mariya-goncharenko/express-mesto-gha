const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/router');

const { PORT = 3000 } = process.env;
const app = express();

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
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

app.get('/', (req, res) => {
  res.send('Вывод чего-то на страницу...');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
