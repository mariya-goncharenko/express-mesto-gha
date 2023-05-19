const router = require('express').Router();
const loginValidation = require('../validation/validation');

const { loginUser } = require('../controllers/auth');

router.post('/signin', loginValidation.loginUser, loginUser);

module.exports = router;
