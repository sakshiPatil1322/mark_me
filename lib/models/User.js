// lib/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["student", "teacher", "principle"], 
      default: "student" 
    },

    // Student fields
    rollNumber: { type: String },
    standard: { type: String },
    division: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
