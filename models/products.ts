import mongoose, { Schema, Model, Document } from "mongoose";

export interface Products extends Document {
  name: string;
  price: number;
  description?: string;
  category?: string;
  imgUrl?: string;
  tags?: string[];
}

const productSchema: Schema <Products> = new Schema({
  name: { type: String, required: true},
  price: { type: Number, default: 0 },
  description: { type: String, default: ""},
  imgUrl: { type: String, default: ""}, //TODO: Make a defaultImageLink
  tags: [String],
});

const products: Model <Products> = mongoose.model("Products", productSchema);

export default products;
