require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin')
const cookieParser = require('cookie-parser');
require('./config/passport')(passport);

const app = express();
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'));

const profileRoutes = require('./routes/profile');


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(passport.initialize());
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes)
app.use('/uploads', express.static('uploads'));
app.use('/profile', profileRoutes);
app.use(cookieParser());

app.listen(5000, () => console.log('Server running on port 5000'));
