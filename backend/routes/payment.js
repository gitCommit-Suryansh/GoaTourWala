const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create", paymentController.createPayment);
router.get("/all", paymentController.getAllPayments);


module.exports = router;
