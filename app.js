const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config');
const rootRouter = require('./routes');

mongoose.set('strictQuery', true);
mongoose.connect(config.DB_URL);

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);
app.use(rootRouter);

app.use(errors());
app.use(errorHandler);

app.listen(config.PORT);
