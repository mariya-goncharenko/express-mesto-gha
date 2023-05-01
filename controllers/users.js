const User = require('../models/user');

// Находим всех пользователей:
module.exports.getUsers = (req, res) => {
  User
    .find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};

// Находим пользователя по ID:
module.exports.getUserId = (req, res) => {
  console.log(req.params.userId);
  User
    .findById(req.params.userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// Создаем пользователя:
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при создании пользователя.',
          });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// Обновление данных пользователя:
module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении профиля.',
        });
      } else if (err.name === 'CastError') {
        res.status(404).send({
          message: 'Пользователь по указанному _id не найден.',
        });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// Обновление аватара пользователя:
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при обновлении аватара.',
        });
      } else if (err.name === 'CastError') {
        res.status(404).send({
          message: 'Пользователь с указанным _id не найден. ',
        });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};
