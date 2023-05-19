const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { URL_REGEX } = require('../utils/constants');
const {
  getUsers,
  getUserId,
  getCurrentUserInfo,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

// Находит всех пользователей:
router.get('/', getUsers);
// Находим пользователя:
router.get('/me', getCurrentUserInfo);
// Находит пользователя по _id:
router.get(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserId,
);
// Обновление профиля:
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserProfile,
);
// Обновление аватара:
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(URL_REGEX),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
