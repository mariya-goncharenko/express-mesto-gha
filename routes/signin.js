const router = require('express').Router();
const { signInValidation } = require('../validations/authValidation');

const { loginUser } = require('../controllers/auth');

router.post('/signin', signInValidation, loginUser);

module.exports = router;
