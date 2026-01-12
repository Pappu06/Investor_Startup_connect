import mongoose from "mongoose";

const startupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    fundingRequired: {
      type: Number,
      required: true
    },

    equityOffer: {
      type: Number,
      required: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Startup = mongoose.model("Startup", startupSchema);

export default Startup;
