const express = require('express');
const { errors } = require('celebrate');

const routeSignup = require('./signup');
const routeSignin = require('./signin');
const routeUsers = require('./users');
const routeCards = require('./cards');

const NotFoundError = require('../errors/NotFoundError');
const errorHandler = require('../middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routeSignup);
app.use('/', routeSignin);
app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));
app.use(errors());
app.use(errorHandler);

module.exports = app;
