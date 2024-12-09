const express = require('express');
const router = express.Router();
const Favorite = require('../Models/Favorite'); // Ensure this path is correct

// POST /api/favorites - Add a car to favorites
router.post('/', async (req, res) => {
  try {
    const { itemId } = req.body;

    // Validate request body
    if (!itemId) {
      return res.status(400).json({ message: 'itemId is required' });
    }

    // Check if the car already exists in favorites
    const existingFavorite = await Favorite.findOne({ itemId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'This car is already in favorites.' });
    }

    // Create a new favorite entry
    const favorite = new Favorite({ itemId });
    await favorite.save();

    res.status(201).json(favorite);
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Failed to add to favorites.' });
  }
});
router.get('/all', async (req, res) => {
  try {
    // Fetch all favorites and populate car details from the itemId
    const favorites = await Favorite.find().populate('itemId');
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Failed to fetch favorites.' });
  }
});


module.exports = router;
