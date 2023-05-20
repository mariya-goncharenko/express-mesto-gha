const router = require('express').Router();

const auth = require('../middlewares/auth');

const signInRouter = require('./signin');
const signUpRouter = require('./signup');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

// Маршруты для аутентификации
router.use('/', signInRouter);
router.use('/', signUpRouter);

router.use(auth);

// Маршруты для пользователей
router.use('/users', usersRouter);

// Маршруты для карточек
router.use('/cards', cardsRouter);

// Обработка несуществующих маршрутов
router.use((req, res, next) => next(new NotFoundError('Страницы по запрошенному URL не существует')));

module.exports = router;
