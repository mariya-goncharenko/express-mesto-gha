const PORT = 3000; // Порт сервера
const DB_URL = 'mongodb://127.0.0.1:27017/mestodb'; // URL базы данных
const SECRET_SIGNING_KEY = '22ee705bd85c1a2cff0f3bf66906e79fdbeca87c2de471334283d0530cde19f5'; // Секретный ключ подписи
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/; // Регулярное выражение для URL

module.exports = {
  PORT,
  DB_URL,
  SECRET_SIGNING_KEY,
  URL_REGEX,
};
