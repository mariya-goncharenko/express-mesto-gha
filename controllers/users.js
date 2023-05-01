const User = require('../models/user');

// Находим всех пользователей:
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};

// Находим пользователя по ID:
module.exports.getUserId = (req, res) => {
  User
    .orFail()
    .findById(req.params.userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(404)
          .send({
            message: 'Пользователь c указанным _id не найден',
          });
      }

      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при поиске пользователя',
          });
      }

      return res.status(500).send({ message: 'Ошибка по умолчанию' });
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
module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при обновлении профиля',
          });
      }

      if (err.name === 'NotFound') {
        return res
          .status(404)
          .send({
            message: 'Пользователь не найден',
          });
      }

      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

// Обновление аватара пользователя:
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при обновлении аватара',
          });
      }

      if (err.name === 'NotFound') {
        return res
          .status(404)
          .send({
            message: 'Пользователь не найден',
          });
      }

      return res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};
