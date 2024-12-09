const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Buy', 'Rent'],
    required: true,
  },
  
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
