import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  ratings: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a product price'],
    default: 0.0,
  },
  category: {
    type: String,
    required: [true, 'Please add a product category'],
  },
  brand: {
    type: String,
    required: [true, 'Please add a product brand'],
  },
  stock: {
    type: Number,
    required: [true, 'Please add the stock count'],
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
