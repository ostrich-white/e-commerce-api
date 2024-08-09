import { Model, Document } from 'mongoose';
import { Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';

interface IFactory<T extends Document> {
  get(id: string): Promise<T | null>;
  create(doc: Partial<T>): Promise<T>;
  update(id: string, doc: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}

export const getAll = <T>(model: Model<T>): Function => 
  catchAsync(async (req: Request, res: Response) => {
      const documents = await model.find();
      res.json(documents);
    })

const factory = <T extends Document>(model: Model<T>): IFactory<T> => ({
  async get(id: string) {
    try {
      const document = await model.findById(id);
      return document;
    } catch (error) {
      console.error('Error fetching document:', error);
      throw error;
    }
  },

  async create(doc: Partial<T>) {
    try {
      return model.create(doc)
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  },

  async update(id: string, doc: Partial<T>) {
    try {
      const document = await model.findByIdAndUpdate(id, doc, { new: true });
      return document;
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  },

  async delete(id: string) {
    try {
      const document = await model.findByIdAndDelete(id);
      return document;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
});

export default factory;