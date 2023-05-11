const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (request, response, next) => {
  const { authorization } = request.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('You need to log in');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, 'cat');
  } catch (err) {
    return next(new UnauthorizedError('You need to log in'));
  }

  request.user = payload;
  return next();
};