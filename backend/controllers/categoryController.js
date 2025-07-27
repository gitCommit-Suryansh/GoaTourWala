const Category = require("../models/category");
const Subcategory = require('../models/subcategory.js');

const slugify = require("slugify"); // install via: npm install slugify

// @desc Create a new main category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Category name is required." });
    }

    const slug = slugify(name, { lower: true });

    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Category already exists." });
    }

    const newCategory = new Category({ name, slug });
    await newCategory.save();

    res
      .status(201)
      .json({ message: "Category created", category: newCategory });
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    console.error("Get Categories Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/categories/all-with-subcategories
exports.allWithSubcategories = async (req, res) => {
  try {
    const categories = await Category.find().lean();
    const subcategories = await Subcategory.find().lean();

    const categoryMap = categories.map((cat) => ({
      ...cat,
      subcategories: subcategories.filter(
        (sub) => sub.category.toString() === cat._id.toString()
      ),
    }));

    res.json(categoryMap);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to load categories and subcategories" });
  }
};


