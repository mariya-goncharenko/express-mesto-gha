const Card = require('../models/card');

// Находим все карточки:
module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при запросе всех карточек' }));
};

// Создаем карточку:
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card
    .create({ name, link, owner })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// Удаляем карточку:
module.exports.deleteCard = (req, res) => {
  Card
    .findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).send({
          message: 'Карточка с указанным _id не найдена.',
        });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// Ставим лайк на карточку:
module.exports.likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные для постановки лайка.',
        });
      } else if (err.name === 'CastError') {
        res.status(404).send({
          message: 'Передан несуществующий _id карточки.',
        });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

// Убираем лайк с карточки:
module.exports.deleteLikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные для снятия лайка.',
        });
      } else if (err.name === 'CastError') {
        res.status(404).send({
          message: 'Передан несуществующий _id карточки.',
        });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};
