const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary-config');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'GOA-TOUR-WALA',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
