import mongoose, { Schema, Model, Document } from "mongoose";

export interface User extends Document {
  name: string;
  mobile: number;
  email: string;
  password: string;
  role: string;
}

const userSchema: Schema <User> = new Schema({
  name: String,
  mobile: Number,
  email: String,
  password: String,
  role: String,
});

const User: Model <User> = mongoose.model("User", userSchema);

export default User;
