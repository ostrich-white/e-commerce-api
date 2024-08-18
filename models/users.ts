import mongoose, { Schema, Model, Document } from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.pre('save', async function (next) {
  if(this.password === this.confirmPassword)
    this.confirmPassword = undefined
  if(this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 8)
  next()
})

userSchema.method('matchPassword', async function (enteredPassword: string) {
  console.log(enteredPassword, this.password);
  
  return await bcrypt.compare(enteredPassword, this.password);
})

const User: Model<User> = mongoose.model("User", userSchema);

export default User;
