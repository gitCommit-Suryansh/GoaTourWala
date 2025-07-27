const Payment = require("../models/Payment");

exports.createPayment = async (req, res) => {
  try {
    const data = req.body;

    const meta = data.metaInfo || {};
    const name = meta.udf0?.split(":")[1] || "N/A";
    const mobileNumber = meta.udf1?.split(":")[1] || "N/A";
    const tripDate = meta.udf3?.split(":")[1] || "N/A";
    const adults = meta.udf4?.split(":")[1] || "0";
    const children = meta.udf5?.split(":")[1] || "0";
    const tripPackage = req.body.tripPackage || "N/A";

    // Perform atomic upsert to avoid duplicate error
    const result = await Payment.updateOne(
      { orderId: data.orderId }, // filter
      {
        $setOnInsert: {
          name,
          mobileNumber,
          orderId: data.orderId,
          state: data.state,
          amount: data.amount,
          tripDate,
          tripDetails: {
            name,
            mobileNumber,
            tripPackage,
            travelDate: tripDate,
            adults,
            chilren: children,
          },
          paymentDetails: data.paymentDetails,
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      return res.status(201).json({ message: "Payment saved successfully" });
    } else {
      return res.status(200).json({ message: "Payment already exists" });
    }
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({ message: "Failed to save payment", error });
  }
};


exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Failed to fetch payments", error });
  }
};