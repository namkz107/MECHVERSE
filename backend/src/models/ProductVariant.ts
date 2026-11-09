import { Schema, model } from "mongoose";
const schema = new Schema(
  {
    code: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["educational-demo", "draft"],
      default: "educational-demo",
    },
    manufacturer: { type: String, trim: true },
    variant: { type: String, trim: true },
    limitations: { type: [String], default: [] },
  },
  {
    timestamps: true,
    bufferCommands: false,
    autoCreate: false,
    autoIndex: false,
  },
);
export const ProductVariant = model("ProductVariant", schema);
