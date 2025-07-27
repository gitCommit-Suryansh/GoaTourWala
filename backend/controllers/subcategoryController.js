const Subcategory = require("../models/subcategory.js");
const Category = require("../models/category.js");
const slugify = require("slugify");
const cloudinary=require('../config/cloudinary-config.js')
// const getPublicIdFromUrl = require("../utils/cloudinaryHelpers.js");


// Create Subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const {
      categoryId,
      name,
      description,
      price,
      duration,
      features,
      details,
    } = req.body;

    // Validate category
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const slug = slugify(name, { lower: true });

    // Parse fields
    const parsedFeatures = JSON.parse(features);
    const parsedDetails = details ? JSON.parse(details) : [];

    // Handle uploaded images from Multer/Cloudinary
    const bannerImage = req.files?.bannerImage?.[0]?.path || "";
    const galleryImages = req.files?.galleryImages?.map((f) => f.path) || [];

    const newSub = new Subcategory({
      category: categoryId,
      name,
      slug,
      description,
      price,
      duration,
      features: parsedFeatures,
      details: parsedDetails,
      bannerImage,
      galleryImages,
    });

    await newSub.save();

    res.status(201).json({
      message: "Subcategory created successfully",
      subcategory: newSub,
    });
  } catch (err) {
    console.error("Create Subcategory Error:", err);
    res.status(500).json({ error: "Server error while creating subcategory" });
  }
};


exports.all = async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    if (!subcategories || subcategories.length === 0) {
      return res.status(404).json({ message: "No subcategories found" });
    }
    return res.status(200).json({ message: "Subcategories fetched successfully", subcategories });
  } catch (err) {
    console.error("Fetch Subcategories Error:", err);
    return res.status(500).json({ message: "There is some error fetching subcategories", error: err });
  }
};

// @desc Get subcategories by category
exports.getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const subs = await Subcategory.find({ category: categoryId });
    res.status(200).json(subs);
  } catch (err) {
    console.error("Fetch Subcategories Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBySlugName = async (req, res) => {
  try {
    const sub = await Subcategory.findOne({ slug: req.params.slug }).lean();
    if (!sub) return res.status(404).json({ error: "Subcategory not found" });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// exports.updateSubcategory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const {
//       name,
//       description,
//       price,
//       duration,
//       features,
//       details,
//       galleryImages, // updated gallery sent from frontend
//     } = req.body;

//     const existingSub = await Subcategory.findById(id);
//     if (!existingSub) {
//       return res.status(404).json({ error: "Subcategory not found" });
//     }

//     const updateData = {
//       name,
//       description,
//       price,
//       duration,
//       features: features ? JSON.parse(features) : [],
//       details: details ? JSON.parse(details) : [],
//       galleryImages: galleryImages ? JSON.parse(galleryImages) : [],
//     };

//     // ❌ Delete old banner image if replaced
//     if (req.files?.bannerImage?.[0] && existingSub.bannerImage) {
//       const publicId = getPublicIdFromUrl(existingSub.bannerImage);
//       if (publicId) await cloudinary.uploader.destroy(publicId);
//     }

//     // ✅ Upload new banner image
//     if (req.files?.bannerImage?.[0]) {
//       const result = await cloudinary.uploader.upload(
//         req.files.bannerImage[0].path,
//         { folder: "GOA-TOUR-WALA" }
//       );
//       updateData.bannerImage = result.secure_url;
//     } else {
//       updateData.bannerImage = existingSub.bannerImage;
//     }

//     // ❌ Delete removed gallery images
//     const oldGallery = existingSub.galleryImages || [];
//     const updatedGallery = updateData.galleryImages;
//     const removedImages = oldGallery.filter((img) => !updatedGallery.includes(img));

//     for (const url of removedImages) {
//       const publicId = getPublicIdFromUrl(url);
//       if (publicId) await cloudinary.uploader.destroy(publicId);
//     }

//     // ✅ Upload newly added gallery images
//     if (req.files?.newGalleryImages?.length) {
//       const uploaded = await Promise.all(
//         req.files.newGalleryImages.map((img) =>
//           cloudinary.uploader.upload(img.path, { folder: "GOA-TOUR-WALA" })
//         )
//       );
//       const newGalleryUrls = uploaded.map((r) => r.secure_url);
//       updateData.galleryImages = [...updatedGallery, ...newGalleryUrls];
//     }

//     const updated = await Subcategory.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });

//     res.status(200).json({
//       message: "Subcategory updated successfully",
//       subcategory: updated,
//     });
//   } catch (err) {
//     console.error("Update Subcategory Error:", err);
//     res.status(500).json({ error: "Failed to update subcategory" });
//   }
// };



// exports.updateSubcategory = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const {
//       name,
//       description,
//       price,
//       duration,
//       features,
//       details,
//       galleryImages, // gallery images retained
//     } = req.body;

//     const existingSub = await Subcategory.findById(id);
//     if (!existingSub) {
//       return res.status(404).json({ error: "Subcategory not found" });
//     }

//     const updateData = {
//       name,
//       description,
//       price,
//       duration,
//       features: features ? JSON.parse(features) : [],
//       details: details ? JSON.parse(details) : [],
//       galleryImages: galleryImages ? JSON.parse(galleryImages) : [],
//     };

//     // ✅ Delete old banner image if replaced
//     if (req.files?.bannerImage?.[0] && existingSub.bannerImage) {
//       const publicId = getPublicIdFromUrl(existingSub.bannerImage);
//       if (publicId) {
//         await cloudinary.uploader.destroy(publicId);
//       }
//     }

//     // ✅ Upload new banner image if any
//     if (req.files?.bannerImage?.[0]) {
//       const result = await cloudinary.uploader.upload(req.files.bannerImage[0].path, {
//         folder: "GOA-TOUR-WALA",
//       });
//       updateData.bannerImage = result.secure_url;
//     } else {
//       updateData.bannerImage = existingSub.bannerImage;
//     }

//     // ✅ Delete removed gallery images
//     const oldGallery = existingSub.galleryImages || [];
//     const updatedGallery = updateData.galleryImages;

//     const removedImages = oldGallery.filter((img) => !updatedGallery.includes(img));
//     for (const url of removedImages) {
//       const publicId = getPublicIdFromUrl(url);
//       if (publicId) await cloudinary.uploader.destroy(publicId);
//     }

//     // ✅ Upload new gallery images and overwrite
//     let newGalleryUrls = [];
//     if (req.files?.newGalleryImages?.length) {
//       const uploads = await Promise.all(
//         req.files.newGalleryImages.map((img) =>
//           cloudinary.uploader.upload(img.path, { folder: "GOA-TOUR-WALA" })
//         )
//       );
//       newGalleryUrls = uploads.map((r) => r.secure_url);
//     }

//     // Final updated gallery = retained + new (no duplication)
//     updateData.galleryImages = [...updatedGallery, ...newGalleryUrls];

//     const updated = await Subcategory.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });

//     res.status(200).json({
//       message: "Subcategory updated successfully",
//       subcategory: updated,
//     });
//   } catch (err) {
//     console.error("Update Subcategory Error:", err);
//     res.status(500).json({ error: "Failed to update subcategory" });
//   }
// };


exports.updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      duration,
      features,
      details,
      galleryImages, // JSON string of retained images
    } = req.body;

    const existingSub = await Subcategory.findById(id);
    if (!existingSub) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    const updateData = {
      name,
      description,
      price,
      duration,
      features: features ? JSON.parse(features) : [],
      details: details ? JSON.parse(details) : [],
    };

    const retainedGallery = galleryImages ? JSON.parse(galleryImages) : [];
    const previousGallery = existingSub.galleryImages || [];

    // 🔴 1. DELETE removed gallery images
    const removedGallery = previousGallery.filter((img) => !retainedGallery.includes(img));
    for (const url of removedGallery) {
      const publicId = getPublicIdFromUrl(url);
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    // ✅ 2. ADD new gallery images (upload)
    let uploadedGallery = [];
    if (req.files?.newGalleryImages?.length) {
      const uploads = await Promise.all(
        req.files.newGalleryImages.map((file) =>
          cloudinary.uploader.upload(file.path, {
            folder: "GOA-TOUR-WALA",
          })
        )
      );
      uploadedGallery = uploads.map((res) => res.secure_url);
    }

    updateData.galleryImages = [...retainedGallery, ...uploadedGallery];

    // 🔄 3. BANNER IMAGE: delete old one if replaced
    if (req.files?.bannerImage?.[0]) {
      const oldBanner = existingSub.bannerImage;
      if (oldBanner) {
        const bannerPublicId = getPublicIdFromUrl(oldBanner);
        if (bannerPublicId) await cloudinary.uploader.destroy(bannerPublicId);
      }

      const uploaded = await cloudinary.uploader.upload(
        req.files.bannerImage[0].path,
        { folder: "GOA-TOUR-WALA" }
      );
      updateData.bannerImage = uploaded.secure_url;
    } else {
      updateData.bannerImage = existingSub.bannerImage;
    }

    const updated = await Subcategory.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      message: "Subcategory updated successfully",
      subcategory: updated,
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "Failed to update subcategory" });
  }
};




