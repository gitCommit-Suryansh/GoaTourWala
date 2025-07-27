const Payment = require("../models/Payment");

exports.getAdminStats = async (req, res) => {
  try {
    const totalBookings = await Payment.countDocuments();

    const revenue = await Payment.aggregate([
      { $match: { state: "COMPLETED" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const activeUsersAgg = await Payment.aggregate([
      {
        $group: {
          _id: "$mobileNumber",
        },
      },
      {
        $count: "uniqueUsers",
      },
    ]);

    const activeUsers = activeUsersAgg[0]?.uniqueUsers || 0;

    res.json({
      totalBookings,
      revenue: revenue[0]?.total || 0,
      activeUsers,
      systemHealth: "N/A%", // still mocked or static
    });
  } catch (error) {
    console.error("Failed to fetch admin stats", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getRecentPayments = async (req, res) => {
    try {
      const payments = await Payment.find()
        .sort({ createdAt: -1 })
        .limit(5);
  
      res.json({ payments });
    } catch (error) {
      console.error("Error fetching recent payments:", error);
      res.status(500).json({ message: "Failed to fetch recent payments" });
    }
  };