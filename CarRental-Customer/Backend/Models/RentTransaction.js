const mongoose = require("mongoose");

const rentTransactionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  rentDuration: { type: Number, required: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("RentTransaction", rentTransactionSchema);
