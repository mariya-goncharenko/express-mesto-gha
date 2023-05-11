// Схема пользователя:
const User = require('../models/user');

// Ошибки:
const BadRequest = require('../errors/BadRequestError'); // 400
const NotFound = require('../errors/NotFoundError'); // 404

// Находим всех пользователей:
module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

// Находим пользователя по ID:
module.exports.getUserId = (req, res, next) => {
  User
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь c указанным _id не найден');
      }
      res.status(200)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(BadRequest('Переданы некорректные данные при поиске пользователя'));
      } else if (err.message === 'NotFound') {
        next(new NotFound('Пользователь c указанным _id не найден'));
      } else {
        next(err);
      }
    });
};

// Создаем пользователя:
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании пользователя.',
        });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// Обновление данных пользователя:
module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(BadRequest('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};

// Обновление аватара пользователя:
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при обновлении аватара'));
      } else {
        next(err);
      }
    });
};
