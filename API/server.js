const express = require('express');
const initializeApp=require("firebase/app");
const admin = require('firebase-admin');
const serviceAccount = require('./capstone-project-27870-firebase-adminsdk-76hey-9a08dc4d32.json');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const categoriesRoutes= require('./routes/categoriesRoutes')
const bannerRoutes=require('./routes/bannerRoutes');
const productsRoutes=require('./routes/productsRoutes');
const productDetailRoutes=require('./routes/productDetailRoutes');




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
app.use('/products', productsRoutes);
app.use('/productdetails', productDetailRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});

const firebaseConfig = {
  apiKey: "AIzaSyC9Tovz_-rzu55jOuP3cWWQBj-BHfjRnTY",
  authDomain: "capstone-project-27870.firebaseapp.com",
  projectId: "capstone-project-27870",
  storageBucket: "capstone-project-27870.firebasestorage.app",
  messagingSenderId: "519332003510",
  appId: "1:519332003510:web:b15409bf22ce8fc4647017"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'capstone-project-27870.firebasestorage.app',
});

const bucket = admin.storage().bucket();


module.exports= {gfs};