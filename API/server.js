const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const categoriesRoutes= require('./routes/categoriesRoutes')
const bannerRoutes=require('./routes/bannerRoutes');



require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
app.use(express.json());
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,  // Set `true` if using HTTPS
    httpOnly: true  // Helps secure the cookie
  }
}));

let gfs;
// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log(`MongoDB connected`)
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');})
.catch(err => console.log(err));

app.use('/users', userRoutes);
app.use('/categories', categoriesRoutes);
app.use('/banner', bannerRoutes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

module.exports= {gfs};