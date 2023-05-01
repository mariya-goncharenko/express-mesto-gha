const router = require('express').Router();

const {
  getUsers,
  getUserId,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

// Находит всех пользователей:
router.get('/', getUsers);
// Находит пользователя по _id:
router.get('/:userId', getUserId);
// Cоздаёт пользователя:
router.post('/', createUser);
// Обновление аватара:
router.patch('/me', updateUserProfile);
// Обновление аватара:
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
