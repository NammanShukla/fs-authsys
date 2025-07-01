require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const passportConfig = require('./config/passport');

const allowedOrigins = ['http://localhost:3000']; 

const app = express();

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('SESSION_SECRET:', process.env.SESSION_SECRET); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());


app.use(session({
  secret: process.env.SESSION_SECRET, 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24, sameSite: 'lax' },
}));

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

app.use((req, res, next) => {
  console.log('Request from origin:', req.headers.origin);
  next();
});
