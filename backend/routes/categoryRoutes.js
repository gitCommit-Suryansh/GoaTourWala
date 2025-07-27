const express = require('express');
const categoryController = require('../controllers/categoryController.js');

const router = express.Router();

// POST /api/categories
router.post('/createcategory', categoryController.createCategory);
router.get('/all', categoryController.getAllCategories);
router.get('/all-with-subcategories',categoryController.allWithSubcategories)


module.exports = router;
