// models/Subcategory.js
const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: String,
    image: String,
    price: Number,
    duration: String,
    features: [String],
    active: { type: Boolean, default: true },
    bannerImage: String, // Cloudinary URL
    galleryImages: [String], // Array of Cloudinary URLs

    // NEW flexible structured data
    details: [
      {
        title: String,
        content: mongoose.Schema.Types.Mixed, // can be string, array, etc.
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subcategory", subcategorySchema);
