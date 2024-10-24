import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  secure_url: { type: String, required: true },
  public_id: { type: String, required: true },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, select: false, required: true },
  avatar: imageSchema,
  wishlist: [{ type: String }],
  topTenList: [{ type: String, max: 10 }],
  gamesRating: [{ type: Schema.Types.ObjectId, ref: "GameReview" }],
  bio: { type: String, max: 500, default: "No bio" },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
