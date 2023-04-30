const User = require('../models/user');

// Находим всех пользователей:
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Находим пользователя по ID:
module.exports.getUserId = (req, res) => {
  console.log(req.params.userId);
  User.findById(req.params.userId)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(404)
          .send({ message: 'Пользователь по указанному _id не найден.' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

// Создаем пользователя:
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({
            message: 'Переданы некорректные данные при создании пользователя.',
          });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};
