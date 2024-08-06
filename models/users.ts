import mongoose, { Schema, Model, Document } from "mongoose";

export interface Users extends Document {
  name: string;
  mobile: number;
  email: string;
  password: string;
  role: string;
}

const userSchema: Schema <Users> = new Schema({
  name: String,
  mobile: Number,
  email: String,
  password: String,
  role: String,
});

const users: Model <Users> = mongoose.model("Users", userSchema);

export default users;
