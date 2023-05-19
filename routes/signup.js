const router = require('express').Router();
const registrationValidation = require('../validation/validation');
const { registrationUser } = require('../controllers/auth');

router.post('/signup', registrationValidation.registrationUser, registrationUser);

module.exports = router;
