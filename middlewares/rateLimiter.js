const rateLimiter = require('express-rate-limit');

module.exports.limiter = rateLimiter({
  max: 150,
  windowMS: 55000,
  message: 'Количество запросов на сервер превысило лимит. Пожалуйста, попробуйте зайти позже.',
});
