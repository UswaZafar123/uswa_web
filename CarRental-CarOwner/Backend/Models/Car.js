const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  carType: {
    type: String,
    enum: ["Sale", "Rent"],
    required: false,
  },
  driverOption: {
    type: String,
    enum: ["With Driver", "Without Driver"],
    required: function () {
      return this.carType === "Rent";
    },
  },
  tripType: {
    type: String,
    enum: ["Airport Pickup", "Northern Trip", "City Travel", "Other"],
    required: function () {
      return this.carType === "Rent" && this.driverOption === "With Driver";
    },
  },
  mileage: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    enum: ["New", "Used"],
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  picture: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  reviews: [
    {
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Linking customer ID to User model
      },
      feedbackText: String,
      rating: Number,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  avgRatings: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Available", "Rented", "Sold"],
    default: "Available",
  },
  revenue: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Car", carSchema);
