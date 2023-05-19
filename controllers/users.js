const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

// Находим всех пользователей:
module.exports.getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

// Общая функция для поиска пользователя по ID
const findUserById = (id) => User.findById(id).then((user) => {
  if (user) {
    return user;
  }
  throw new NotFoundError('Пользователь с указанным _id не найден');
});

// Находим конкретного пользователя по ID
module.exports.getUserId = (req, res, next) => {
  const { id } = req.params;

  findUserById(id)
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err instanceof BadRequestError) {
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
    .then((user) => {
      res.send({ user });
    })
    .catch(next);
};

// Общая функция для обновления данных пользователя
const updateUserProfileData = (userId, updateData) => User.findByIdAndUpdate(userId, updateData, {
  new: true,
  runValidators: true,
}).then((user) => {
  if (user) {
    return user;
  }
  throw new NotFoundError('Пользователь c указанным _id не найден');
});

// Обновление данных пользователя
module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { userId } = req.user;
  const updateData = {
    name,
    about,
  };

  updateUserProfileData(userId, updateData)
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err instanceof BadRequestError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля',
          ),
        );
      } else {
        next(err);
      }
    });
};

// Обновление аватара пользователя
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { userId } = req.user;
  const updateData = {
    avatar,
  };

  updateUserProfileData(userId, updateData)
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err instanceof BadRequestError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении профиля пользователя',
          ),
        );
      } else {
        next(err);
      }
    });
};
