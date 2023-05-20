const { ValidationError } = require('mongoose').Error;
const { CastError } = require('mongoose').Error;

const Card = require('../models/card');

const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

// Находим все карточки:
module.exports.getCards = (req, res, next) => {
  Card
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// Создаем карточку:
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { userId } = req.user;

  Card
    .create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании карточки',
          ),
        );
      } else {
        next(err);
      }
    });
};

// Удаляем карточку:
module.exports.deleteCard = (req, res, next) => {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card
    .findById({
      _id: cardId,
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные по указанному id не найдены');
      }

      const { owner: cardOwnerId } = card;

      if (cardOwnerId.valueOf() !== userId) {
        throw new ForbiddenError('Нет прав доступа');
      }

      return Card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new NotFoundError('Карточка уже была удалена');
      }

      res.send({ data: deletedCard });
    })
    .catch(next);
};

// Ставим лайк на карточку:
module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card
    .findByIdAndUpdate(
      cardId,
      {
        $addToSet: {
          likes: userId,
        },
      },
      {
        new: true,
      },
    )
    .then((card) => {
      if (card) return res.send({ data: card });

      throw new NotFoundError('Карточка с указанным id не найдена');
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при добавлении лайка карточке',
          ),
        );
      } else {
        next(err);
      }
    });
};

// Убираем лайк с карточки:
module.exports.deleteLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;

  Card
    .findByIdAndUpdate(
      cardId,
      {
        $pull: {
          likes: userId,
        },
      },
      {
        new: true,
      },
    )
    .then((card) => {
      if (card) return res.send({ data: card });

      throw new NotFoundError('Данные по указанному id не найдены');
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(
          new BadRequestError(
            'Переданы некорректные данные при снятии лайка карточки',
          ),
        );
      } else {
        next(err);
      }
    });
};
