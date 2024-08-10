import { Model, Document } from 'mongoose';
import { Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';

interface IFactory<T extends Document> {
  delete(id: string): Promise<T | null>;
}

export const getAll = <T>(model: Model<T>): Function => 
  catchAsync(async (req: Request, res: Response) => {
      const documents = await model.find();
      res.json(documents);
    })

const factory = <T extends Document>(model: Model<T>): IFactory<T> => ({
 
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

export const get = <T>(model: Model<T>): Function => 
  catchAsync(async (req: Request, res: Response) => {
    const document = await model.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json(document);
  })

export const create = <T>(model: Model<T>): Function => 
  catchAsync(async (req: Request, res: Response) => {
    const document = await model.create(req.body);
    
    res.status(201).json(document);
  })

export const update = <T>(model: Model<T>): Function => 
  catchAsync(async (req: Request, res: Response) => {
    const {params: {id}, body} = req
    const document = await model.findByIdAndUpdate(id, body, { new: true });
      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }
      res.json(document);
  })
  