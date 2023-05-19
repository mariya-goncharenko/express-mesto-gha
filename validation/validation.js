const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');

const userValidation = {
  getUserId: celebrate({
    params: Joi.object({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  updateUserProfile: celebrate({
    body: Joi.object({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUserAvatar: celebrate({
    body: Joi.object({
      avatar: Joi.string().pattern(URL_REGEX).required(),
    }),
  }),
};

const cardValidation = {
  createCard: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(URL_REGEX),
    }),
  }),
  deleteCard: celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  likeCard: celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteLikeCard: celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
};

const loginValidation = {
  loginUser: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
    }),
  }),
};

const registrationValidation = {
  registrationUser: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(URL_REGEX),
    }),
  }),
};

module.exports = {
  cardValidation,
  userValidation,
  loginValidation,
  registrationValidation,
};
