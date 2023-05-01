const router = require('express').Router();

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
router.post('/', createCard);
// Удаляем карточку:
router.delete('/:cardId', deleteCard);
// Ставим лайк на карточку:
router.put('/:cardId/likes', likeCard);
// Убираем лайк с карточки:
router.delete('/:cardId/likes', deleteLikeCard);

module.exports = router;
