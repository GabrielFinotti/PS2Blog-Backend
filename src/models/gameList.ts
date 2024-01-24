import mongoose from "mongoose";

const gameListSchema: mongoose.Schema = new mongoose.Schema(
  {
    gameName: {
      type: String,
      required: false,
      trim: true,
    },
    href: {
      type: String,
      required: false,
      trim: true,
    },
    size: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("gameList", gameListSchema);
