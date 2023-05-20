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
      if (err.name === 'ValidationError') {
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

  Card.deleteOne({ _id: cardId, owner: userId })
    .then((result) => {
      if (result.deletedCount === 0) {
        throw new ForbiddenError('У вас нет прав на удаление этой карточки');
      }

      res.send({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => {
      if (err.name === 'ForbiddenError') {
        next(err);
      } else {
        next(new NotFoundError('Карточка не найдена или у вас нет прав на ее удаление'));
      }
    });
};

/* module.exports.deleteCard = (req, res, next) => {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card
    .findOne({ _id: cardId, owner: userId })
    .then((card) => {
      if (!card) {
        throw new ForbiddenError('У вас нет прав на удаление этой карточки');
      }

      return Card.deleteOne({ _id: cardId });
    })
    .then((result) => {
      if (result.deletedCount === 0) {
        throw new NotFoundError('Карточка не найдена или у вас нет прав на ее удаление');
      }

      res.send({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => {
      if (err.name === 'ForbiddenError') {
        next(err);
      } else {
        next(err);
      }
    });
};

 module.exports.deleteCard = (req, res, next) => {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card
    .deleteOne({ _id: cardId, owner: userId })
    .then((result) => {
      if (result.deletedCount === 0) {
        throw new ForbiddenError('Карточка уже была удалена или нет прав доступа');
      }
      res.send({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => {
      if (err.name === 'ForbiddenError') {
        next(err);
      } else {
        next(new NotFoundError('Карточка не найдена или у вас нет прав на ее удаление'));
      }
    });
};

 module.exports.deleteCard = (req, res, next) => {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Card
    .deleteOne({ _id: cardId, owner: userId })
    .then((result) => {
      if (result.deletedCount === 0) {
        throw new NotFoundError(
          'Карточка не найдена или у вас нет прав на ее удаление',
        );
      }
      res.send({ message: 'Карточка успешно удалена' });
    })
    .catch(next);
};
*/

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
      if (err.name === 'ValidationError') {
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
      if (err.name === 'ValidationError') {
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
