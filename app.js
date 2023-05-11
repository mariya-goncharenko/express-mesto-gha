const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const routes = require('./routes/router');
const { createUser, login } = require('./controllers/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());

app.use((err, req, res, next) => {
  const {
    status = 500,
    message,
  } = err;
  res.status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.post('/signin', login);
app.post('/signup', createUser);
app.use(routes);

// Данный адрес взят после подключения через терминал с помощью mongosh:
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
