const router = require('express').Router();

const {
  getUsers,
  getUserId,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

// Находит всех пользователей:
router.get('/users', getUsers);
// Находит пользователя по _id:
router.get('/users/:userId', getUserId);
// Cоздаёт пользователя:
router.post('/users', createUser);
// Обновление аватара:
router.patch('/users/me', updateUserProfile);
// Обновление аватара:
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
