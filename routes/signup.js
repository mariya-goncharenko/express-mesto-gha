const router = require('express').Router();
const { signUpValidation } = require('../validations/authValidation');

const { registrationUser } = require('../controllers/auth');

router.post('/signup', signUpValidation, registrationUser);

module.exports = router;
