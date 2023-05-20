const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const config = require('../config');

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
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUserProfile,
);
// Обновление аватара:
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(config.URL_REGEX).required(),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
