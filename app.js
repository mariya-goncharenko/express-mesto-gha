const express = require('express'); // express import
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express(); // возвращает функцию конструктор с методами get, listen, use и др.

mongoose.connect('mongodb://localhost:27017/mestodb ')
  .then(() => {
    console.log('connected');
  })
  .catch(() => {
    console.log('error db connection');
  });

app.get('/', (req, res) => { // логика обработки запроса
  res.send('hello world111!');
});

app.listen(PORT, () => { // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
