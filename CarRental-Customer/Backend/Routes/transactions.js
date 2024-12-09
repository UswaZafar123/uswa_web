const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.post('/buy', async (req, res) => {
  try {
    const { carId, username, email, contact, amount } = req.body;

    if (!carId || !username || !email || !contact || !amount) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTransaction = new Transaction({
      carId,
      username,
      email,
      contact,
      type: 'Buy',
      amount,
    });

    await newTransaction.save();
    res.status(201).json({ message: 'Transaction saved successfully!' });
  } catch (error) {
    console.error('Error processing transaction:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
