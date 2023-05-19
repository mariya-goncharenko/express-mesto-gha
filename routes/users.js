const router = require('express').Router();

const userValidation = require('../validation/validation');

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
router.get('/:id', userValidation.getUserId, getUserId);
// Обновление профиля:
router.patch('/me', userValidation.updateUserProfile, updateUserProfile);
// Обновление аватара:
router.patch('/me/avatar', userValidation.updateUserAvatar, updateUserAvatar);

module.exports = router;
