const express = require('express');
const config = require('config');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const userMiddleware = require('./middleware/user');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const boardRoutes = require('./routes/board.routes');
const PORT = config.get('port') || 5000;

const app = express();

const store = new MongoStore({
  collection: 'sessions',
  uri: config.get('MONGO_URI')
})

app.use(express.json({ extended: true }));

app.use(session({
  secret: config.get('jwtSecret'),
  resave: false,
  saveUninitialized: false,
  store
}))

app.use(userMiddleware);
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);

async function start() {
  try {
    await mongoose.connect(config.get('MONGO_URI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.listen(PORT, () => {
      console.log(`server has been started on PORT ${PORT}`);
    })
  } catch (e) {
    console.log('Server error: ', e.message);
    process.exit(1);
  }
}

start();
