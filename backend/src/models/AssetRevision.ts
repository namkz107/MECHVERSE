import { Schema, model } from "mongoose";
const schema = new Schema(
  {
    assetId: { type: String, required: true, trim: true },
    productCode: { type: String, required: true, trim: true },
    revision: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Revision must be an integer.",
      },
    },
    geometryPath: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["educational-demo", "draft"],
      default: "educational-demo",
    },
    occurrenceIds: {
      type: [String],
      required: true,
      validate: {
        validator: (ids: string[]) =>
          ids.length > 0 &&
          ids.every((id) => id.trim().length > 0) &&
          new Set(ids).size === ids.length,
        message: "Occurrence IDs must be non-empty and unique.",
      },
    },
    scaleStatus: {
      type: String,
      enum: ["illustrative-unverified", "reference-checked"],
      default: "illustrative-unverified",
    },
  },
  {
    timestamps: true,
    bufferCommands: false,
    autoCreate: false,
    autoIndex: false,
  },
);
schema.index({ assetId: 1, revision: 1 }, { unique: true });
export const AssetRevision = model("AssetRevision", schema);
