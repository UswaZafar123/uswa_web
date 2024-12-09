const express = require('express');
const app = express();

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/User');
const cars = require('./Routes/Car');
const carOwnerRoutes = require("./Routes/CarOwner");
const FeedbacksPage=require("./Routes/FeedbackRoutes");
//const auths = require('./middlewares/Authmidddleware');

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
app.use("/api/car-owner", carOwnerRoutes);
app.use("/api/feedback",FeedbacksPage);
//app.use('/api/auth',auths);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
