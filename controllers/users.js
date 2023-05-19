const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_SIGNING_KEY } = require('../utils/constants');

// Схема пользователя:
const User = require('../models/user');

// Ошибки:
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
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
        return next(
          new ConflictError(
            'Пользователь с таким электронным адресом уже зарегистрирован',
          ),
        );
      } if (err.name === 'ValidationError') {
        return next(
          new BadRequestError(
            'Переданы некорректные данные при регистрации пользователя',
          ),
        );
      }
      return next(err);
    });
};

// Логирование пользователей:
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then(({ _id: userId }) => {
      if (userId) {
        const token = jwt.sign({ userId }, SECRET_SIGNING_KEY, {
          expiresIn: '7d',
        });

        return res.send({ token });
      }

      throw new UnauthorizedError('Неправильные почта или пароль');
    })
    .catch(next);
};

// Находим всех пользователей:
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

// Находим пользователя по ID:
module.exports.getUserId = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }

      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорректный id'));
      }
      return next(err);
    });
};

// Поиск текущего пользователя:
module.exports.getCurrentUserInfo = (req, res, next) => {
  const { userId } = req.user;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }

      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан некорректный id'));
      }
      return next(err);
    });
};

// Обновление данных пользователя:
module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }

      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля',
          ),
        );
      }
      return next(err);
    });
};

// Обновление аватара пользователя:
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(
    userId,
    {
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }

      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля пользователя',
          ),
        );
      }
      return next(err);
    });
};
