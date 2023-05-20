const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const config = require('../config');
const { registrationUser } = require('../controllers/auth');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(config.URL_REGEX),
    }),
  }),
  registrationUser,
);

module.exports = router;
