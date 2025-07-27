const express = require("express");
const router = express.Router();
const adminController= require("../controllers/adminController");

router.get("/stats", adminController.getAdminStats);
router.get("/recent-payments", adminController.getRecentPayments); // 👈 Add this


module.exports = router;
