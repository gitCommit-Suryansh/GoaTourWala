const express = require('express');
const subcategoryController = require('../controllers/subcategoryController.js');
const upload = require('../config/multer-config');


const router = express.Router();

// POST /api/subcategories
router.post('/createsubcategory', upload.fields([{ name: 'bannerImage', maxCount: 1 },{ name: 'galleryImages', maxCount: 10 }]), subcategoryController.createSubcategory);
router.get('/all',subcategoryController.all)
router.get('/:categoryId', subcategoryController.getSubcategoriesByCategory);
router.get('/get-by-slug/:slug', subcategoryController.getBySlugName);
router.put('/update/:id',upload.fields([{ name: 'bannerImage', maxCount: 1 },{ name: 'newGalleryImages', maxCount: 10 },]),subcategoryController.updateSubcategory);
  

module.exports=router
