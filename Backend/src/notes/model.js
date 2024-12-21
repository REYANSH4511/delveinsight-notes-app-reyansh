const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: String, required: true, enum: ["work", "personal"] },
    userId: { type: Schema.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const Notes = model("notes", noteSchema);

module.exports = Notes;
