const router = require('express').Router();

const routeSignin = require('./signin');
const routeSignup = require('./signup');
const routeUsers = require('./users');
const routeCards = require('./cards');

router.use('/', routeSignup);
router.use('/', routeSignin);
router.use('/users', routeUsers);
router.use('/cards', routeCards);

module.exports = router;
