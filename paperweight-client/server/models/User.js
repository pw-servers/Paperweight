import mongoose from "mongoose";

export const User = mongoose.model('User', {
  id: mongoose.ObjectId,
  name: String,
  email: String
})