import mongoose, { Schema, Model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  resetToken?: string;
  expireToken?: string;
  role?: string;
  matchPassword: (password: string) => Promise<Boolean>;
};

const userSchema: Schema<IUser> = new Schema({
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

const User: Model<IUser> = mongoose.model("User", userSchema);

export default User;
