import InvestmentInterest from "../models/InvestmentInterest.js";
import Startup from "../models/Startup.js";

// 🔹 Investor sends interest
export const sendInterest = async (req, res) => {
  try {
    const { startupId, message } = req.body;

    // Check startup exists
    const startup = await Startup.findById(startupId);
    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    // Prevent duplicate interest
    const alreadyInterested = await InvestmentInterest.findOne({
      investor: req.user._id,
      startup: startupId
    });

    if (alreadyInterested) {
      return res
        .status(400)
        .json({ message: "You already showed interest" });
    }

    const interest = await InvestmentInterest.create({
      investor: req.user._id,
      startup: startupId,
      message
    });

    res.status(201).json({
      message: "Interest sent successfully",
      interest
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Business user views interests
export const getInterestsForBusiness = async (req, res) => {
  try {
    const interests = await InvestmentInterest.find()
      .populate("investor", "name email")
      .populate("startup", "title owner");

    // Filter only startups owned by logged-in business user
    const filtered = interests.filter(
      (i) => i.startup.owner.toString() === req.user._id.toString()
    );

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

