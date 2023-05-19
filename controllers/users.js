const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

// Находим всех пользователей:
module.exports.getUsers = (_, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

// Находим конкретного пользователя по ID:
module.exports.getUserId = (req, res, next) => {
  const { id } = req.params;

  User
    .findById(id)
    .then((user) => {
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь c указанным _id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные при поиске пользователя'));
      } else {
        next(err);
      }
    });
};

// Поиск пользователя:
module.exports.getCurrentUserInfo = (req, res, next) => {
  const { userId } = req.user;

  User
    .findById(userId)
    .then((user) => {
      if (user) {
        return res.send({ user });
      }

      throw new NotFoundError('Пользователь с указанным _id не найден');
    })
    .catch(next);
};

// Обновление данных пользователя:
module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { userId } = req.user;

  User
    .findByIdAndUpdate(
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
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь c указанным _id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
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

// Обновление аватара пользователя:
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { userId } = req.user;

  User
    .findByIdAndUpdate(
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
      if (user) return res.send({ user });

      throw new NotFoundError('Пользователь c указанным _id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
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
