const router = require('express').Router();

const {
  getUsers,
  getUserId,
  createUser,
} = require('../controllers/users');

// Находит всех пользователей:
router.get('/users', getUsers);
// Находит пользователя по _id:
router.get('/users/:userId', getUserId);
// Cоздаёт пользователя:
router.post('/users', createUser);

module.exports = router;
