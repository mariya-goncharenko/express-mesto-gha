const jwt = require('jsonwebtoken');
const config = require('../config');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, _, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  const errorMsg = 'Неправильные почта или пароль';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError(`${errorMsg}(${authorization})!`));
  }

  const token = authorization.replace(bearer, '');
  let payload;

  try {
    payload = jwt.verify(token, config.SECRET_SIGNING_KEY);
  } catch (err) {
    return next(new UnauthorizedError(`${errorMsg}!`));
  }

  req.user = payload;

  return next();
};
