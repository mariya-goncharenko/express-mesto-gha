const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const config = require('../config');

const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

// Регистрация пользователя:
module.exports.registrationUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { _id } = user;
      return res.status(201).send({
        email,
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        throw new ConflictError(
          'Пользователь с таким электронным адресом уже зарегистрирован',
        );
      }
      throw new BadRequestError(
        'Переданы некорректные данные при регистрации пользователя',
      );
    })
    .catch(next);
};

// Авторизация пользователя:
module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      const token = jwt.sign({ userId }, config.SECRET_SIGNING_KEY, { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch(() => {
      next(new UnauthorizedError('Неправильные почта или пароль'));
    });
};
