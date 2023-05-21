const { ValidationError } = require('mongoose').Error;
const { CastError } = require('mongoose').Error;

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

// Находим всех пользователей:
module.exports.getUsers = (_, res, next) => {
  User
    .find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

// Функция для поиска пользователя по ID
const findUserById = (id) => User.findById(id).then((user) => {
  if (user) {
    return user;
  }
  throw new NotFoundError('Пользователь c указанным _id не найден');
});

// Находим конкретного пользователя по ID
module.exports.getUserId = (req, res, next) => {
  const { id } = req.params;

  findUserById(id)
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err instanceof CastError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при поиске пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
};

// Поиск авторизованного пользователя
module.exports.getCurrentUserInfo = (req, res, next) => {
  const { userId } = req.user;

  findUserById(userId)
    .then((user) => res.send({ user }))
    .catch(next);
};

// Функция для обновления данных пользователя
const updateUserProfileData = (userId, data) => User.findByIdAndUpdate(userId, data, {
  new: true,
  runValidators: true,
}).then((user) => {
  if (user) {
    return user;
  }
  throw new NotFoundError('Пользователь с указанным _id не найден');
}).catch((err) => {
  if (err instanceof ValidationError) {
    throw new BadRequestError('Переданы некорректные данные при обновлении информации');
  }
  throw err;
});

// Обновление данных пользователя
module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { userId } = req.user;

  updateUserProfileData(userId, { name, about })
    .then((user) => res.send({ user }))
    .catch((err) => next(err));
};

// Обновление аватара пользователя
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { userId } = req.user;

  updateUserProfileData(userId, { avatar })
    .then((user) => res.send({ user }))
    .catch((err) => next(err));
};
