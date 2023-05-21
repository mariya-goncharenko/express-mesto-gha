const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const config = require('../config');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => /.+@.+\..+/.test(email),
        message: 'Требуется ввести электронный адрес',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: [2, 'Минимальная длина поля - 2'],
      maxlength: [30, 'Максимальная длина поля - 30'],
    },

    about: {
      type: String,
      default: 'Исследователь',
      minlength: [2, 'Минимальная длина поля - 2'],
      maxlength: [30, 'Максимальная длина поля - 30'],
    },

    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => config.URL_REGEX.test(url),
        message: 'Требуется ввести URL',
      },
    },
  },

  {
    versionKey: false,
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (user) {
              return bcrypt.compare(password, user.password).then((matched) => {
                if (matched) {
                  return user;
                }
                throw new Error('Неправильные почта или пароль');
              });
            }
            throw new Error('Неправильные почта или пароль');
          });
      },

    },
  },
);

module.exports = mongoose.model('user', userSchema);
