import mongoose, { Schema, Model, Document } from "mongoose";

export interface Products extends Document {
  name: string;
}

const productSchema: Schema <Products> = new Schema({
  name: String,
});

const products: Model <Products> = mongoose.model("Products", productSchema);

export default products;
                                                                                                                                          