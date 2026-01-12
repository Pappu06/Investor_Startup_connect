import mongoose from "mongoose";

const investmentInterestSchema = new mongoose.Schema(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true
    },

    message: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const InvestmentInterest = mongoose.model(
  "InvestmentInterest",
  investmentInterestSchema
);

export default InvestmentInterest;
