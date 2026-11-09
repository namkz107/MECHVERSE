import { Schema, model } from "mongoose";
const schema = new Schema(
  {
    code: { type: String, required: true, trim: true },
    releaseId: { type: String, required: true, trim: true },
    revision: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Revision must be an integer.",
      },
    },
    title: { type: String, required: true, trim: true },
    objective: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["draft-demo", "draft", "needs-review"],
      default: "draft-demo",
    },
    conceptIds: { type: [String], default: [] },
    occurrenceIds: { type: [String], default: [] },
  },
  {
    timestamps: true,
    bufferCommands: false,
    autoCreate: false,
    autoIndex: false,
  },
);
schema.index({ code: 1, revision: 1 }, { unique: true });
export const LessonRevision = model("LessonRevision", schema);
