import mongoose, { Schema } from "mongoose";

const gameReviewSchema = new Schema({
  gameId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reviewText: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 10 },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const GameReview = mongoose.models.GameReview || mongoose.model("GameReview", gameReviewSchema);
export default GameReview;
