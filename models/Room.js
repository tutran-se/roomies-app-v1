import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
      unique: true,
      maxLength: [100, "Room name cannot exceed 100 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required!"],
      trim: true,
      maxLength: [100, "Room location cannot exceed 100 characters"],
    },
    pricePerMonth: {
      type: Number,
      required: [true, "Price is required! "],
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
          default: "public_id",
        },
        url: {
          type: String,
          required: true,
          default: "public_id",
        },
      },
    ],
    type: {
      type: String,
      required: [true, "Please enter room type"],
      enum: {
        values: ["Studio", "Condo", "Apartment"],
        message: "Please select the correct type for room",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Room || mongoose.model("Room", roomSchema);
