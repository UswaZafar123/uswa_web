const express = require("express");
const router = express.Router();
const Analytics = require("../Models/Analytics");

router.get("/", async (req, res) => {
  try {
    console.log("analytics g");
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(0); // Default to the beginning of time
    const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date(); // Default to now

    const analyticsData = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$activityType",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = analyticsData.reduce(
      (acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      },
      { login: 0, registration: 0 }
    );
console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching analytics:", error.message);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
});

module.exports = router;
