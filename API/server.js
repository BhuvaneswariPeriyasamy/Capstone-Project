const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');



require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(express.json());


// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(`MongoDB connected`))
.catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});