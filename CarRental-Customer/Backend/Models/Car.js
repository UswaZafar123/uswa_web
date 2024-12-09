const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Members",
    required: true, // Link to the car owner (vendor)
  },
  make: {
    type: String,
    required: true, // Car manufacturer
  },
  model: {
    type: String,
    required: true, // Car model
  },
  year: {
    type: Number,
    required: true, // Manufacturing year
  },
  pricePerDay: {
    type: Number,
    required: true, // Rental price per day
  },
  mileage: {
    type: Number,
    required: true, // Total mileage driven
  },
  condition: {
    type: String,
    enum: ["New", "Used"], // Restrict condition to specific values
    required: true,
  },
  availability: {
    type: Boolean,
    default: true, // Whether the car is available for rent
  },
  picture: {
    type: String, // Path to the car image
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set creation date
  },
  reviews: [
    {
      customerName: String,
      customerEmail: String,
      reviewText: String,
      rating: Number,
      replies: [
        {
          replyText: String,
          repliedBy: String,
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
  ],
  avgRatings: { type: Number, default: 0 },
});


module.exports = mongoose.model("Car", carSchema);