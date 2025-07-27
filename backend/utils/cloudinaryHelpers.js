// utils/cloudinaryHelpers.js
// 👇 Helper function
const getPublicIdFromUrl = (url) => {
  try {
    const parts = url.split("/");
    const fileWithExt = parts[parts.length - 1];
    const publicId = fileWithExt.split(".")[0]; // Remove extension
    return `GOA-TOUR-WALA/${publicId}`;
  } catch {
    return null;
  }
};

  
  module.exports = getPublicIdFromUrl;
  