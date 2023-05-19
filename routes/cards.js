const router = require('express').Router();

const cardValidation = require('../validation/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLikeCard,
} = require('../controllers/cards');

// Находим все карточки:
router.get('/', getCards);
// Создаем карточку:
router.post('/', cardValidation.createCard, createCard);
// Удаляем карточку:
router.delete('/:id', cardValidation.deleteCard, deleteCard);
// Ставим лайк на карточку:
router.put('/:cardId/likes', cardValidation.likeCard, likeCard);
// Убираем лайк с карточки:
router.delete('/:cardId/likes', cardValidation.deleteLikeCard, deleteLikeCard);

module.exports = router;
