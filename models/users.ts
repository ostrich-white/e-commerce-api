import mongoose, { Schema, Model, Document } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  resetToken?: string;
  expireToken?: string;
  role?: string;
};

const userSchema: Schema<User> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  confirmPassword: { type: String },
  resetToken: { type: String },
  expireToken: { type: String },
  role: { type: String, default: "user" },
});

const User: Model <User> = mongoose.model("User", userSchema);

export default User;
