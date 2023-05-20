const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimiter');
const app = require('./routes/index');

const URL = 'mongodb://127.0.0.1:27017/mestodb';
const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

app.use(helmet());
app.use(limiter);

mongoose.connect(URL);

app.listen(PORT);
