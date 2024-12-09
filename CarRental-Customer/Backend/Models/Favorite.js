const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car', // Replace 'Car' with the model name for your cars
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Favorite', favoriteSchema);
