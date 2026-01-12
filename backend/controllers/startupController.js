import Startup from "../models/Startup.js";

// 🔹 CREATE STARTUP (Business only)
export const createStartup = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      fundingRequired,
      equityOffer
    } = req.body;

    // Basic validation
    if (
      !title ||
      !description ||
      !category ||
      !fundingRequired ||
      !equityOffer
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const startup = await Startup.create({
      title,
      description,
      category,
      fundingRequired,
      equityOffer,
      owner: req.user._id
    });

    res.status(201).json({
      message: "Startup created successfully",
      startup
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 GET ALL APPROVED STARTUPS (Public / Investor)
export const getAllStartups = async (req, res) => {
  try {
    const startups = await Startup.find({ status: "approved" })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(startups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 GET SINGLE STARTUP BY ID
export const getStartupById = async (req, res) => {
  try {
    const startup = await Startup.findById(req.params.id)
      .populate("owner", "name email");

    if (!startup) {
      return res.status(404).json({ message: "Startup not found" });
    }

    res.json(startup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
