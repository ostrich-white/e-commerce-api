import { Model } from 'mongoose';
import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

export const getAll = <T>(model: Model<T>): Function => 
  catchAsync(async (req: Request, res: Response) => {
      const documents = await model.find();
      res.json(documents);
    })

export const get = <T>(model: Model<T>): Function => 
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const document = await model.findById(req.params.id);
    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.json(document);
  })

export const create = <T>(model: Model<T>): Function => 
  catchAsync(async (req: Request, res: Response) => {
    const document = await model.create(req.body);
    
    res.status(201).json(document);
  })

export const update = <T>(model: Model<T>): Function => 
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {params: {id}, body} = req
    const document = await model.findByIdAndUpdate(id, body, { new: true });
      if (!document) {
        return next(new AppError('No document found with that ID', 404));
      }
      res.json(document);
  })
  
export const remove = <T>(model: Model<T>): Function => 
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const document = await model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).send();
  })
