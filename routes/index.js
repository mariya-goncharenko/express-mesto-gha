const express = require('express');

const router = express.Router();
const routeSignup = require('./signup');
const routeSignin = require('./signin');
const routeUsers = require('./users');
const routeCards = require('./cards');

router.use('/', routeSignup);
router.use('/', routeSignin);
router.use('/users', routeUsers);
router.use('/cards', routeCards);

module.exports = router;
