const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const limiter = require('./middlewares/rateLimiter');
const auth = require('./middlewares/auth');

const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');
const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');

const config = require('./config');

mongoose.set('strictQuery', true);
mongoose.connect(config.DB_URL);

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));

app.use(errors());
app.use(errorHandler);

app.listen(config.PORT);
