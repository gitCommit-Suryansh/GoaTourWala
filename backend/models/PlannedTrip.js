// 1. MODEL: models/PlannedTrip.js
const mongoose = require("mongoose");

const PlannedTripSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String },
  mobileNumber: { type: String, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, required: true },
  accommodationType: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  selectedTrips: [{ type:String }],
  budgetRange: {
    min: { type: Number },
    max: { type: Number },
  },
  mealPreferences: { type: String },
  purpose: { type: String },
  addOns: [{ type: String }],
  specialRequests: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PlannedTrip", PlannedTripSchema);
