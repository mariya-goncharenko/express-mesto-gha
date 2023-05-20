const router = require('express').Router();
const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  deleteLikeCardValidation,
} = require('../validations/cardsValidation');

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
router.post('/', createCardValidation, createCard);
// Удаляем карточку:
router.delete('/:id', deleteCardValidation, deleteCard);
// Ставим лайк на карточку:
router.put('/:cardId/likes', likeCardValidation, likeCard);
// Убираем лайк с карточки:
router.delete('/:cardId/likes', deleteLikeCardValidation, deleteLikeCard);

module.exports = router;
