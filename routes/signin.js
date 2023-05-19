const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { loginUser } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), loginUser);

module.exports = router;
