const router = require('express').Router();

const {
  updateUserProfileValidation,
  updateUserAvatarValidation,
  getUserIdValidation,
} = require('../validations/usersValidation');

const {
  getUsers,
  getUserId,
  getCurrentUserInfo,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

// Находим всех пользователей:
router.get('/', getUsers);
// Находим пользователя:
router.get('/me', getCurrentUserInfo);
// Находим пользователя по _id:
router.get('/:id', getUserIdValidation, getUserId);
// Обновление профиля:
router.patch('/me', updateUserProfileValidation, updateUserProfile);
// Обновление аватара:
router.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);

module.exports = router;
