const express = require('express');
const app = express();
const favoritesRoutes = require('./Routes/favorites');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/User');
const cars = require('./Routes/Car');
//const transactionRoutes = require('./Routes/transactions');
//const auths = require('./middlewares/Authmidddleware');
//const Favorite = require('../models/Favorite');
const cors = require('cors');
app.use(cors());
app.use(express.json()); // To parse JSON requests



dotenv.config();


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

// Middleware

// User Routes
app.use('/api/users', userRoutes);
app.use('/api/cars',cars);
//app.use('/api/auth',auths);
app.use('/api/favorites', favoritesRoutes);
// Routes
const transactionRoutes = require('./routes/transactions');
app.use('/api/transactions', transactionRoutes);
// server.js
const feedbackRoutes = require('./Routes/feedback');
app.use('/api/feedback', feedbackRoutes);
const rentRoutes = require("./Routes/rent");
app.use("/api/rent", rentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
app.post('/api/feedback', async (req, res) => {
    try {
      const { carId, userId, rating, comment } = req.body;
  
      // Validate required fields
      if (!carId || !userId || !rating || !comment) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Save the review
      const review = await Review.create({ carId, userId, rating, comment });
      res.status(201).json(review);
    } catch (error) {
      console.error('Error saving review:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.post('/api/transactions/buy', (req, res) => {
    console.log("Received data:", req.body);
  
    const { carId, type, amount } = req.body;
  
    if (!carId || !type || !amount) {
      return res.status(400).json({ error: "Missing required fields." });
    }
  
    // Proceed with your transaction logic
    res.status(201).json({ message: "Transaction successful!" });
  });
  



  
  
  
