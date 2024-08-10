import { Request, Response, NextFunction,  Router } from 'express';
import { Model, Document } from 'mongoose';
import factory from "../controllers/factory";

const buildCRUD = <T extends Document>(model: Model<T>, router: Router= Router()) => {
  const { } = factory(model);

  const controller = {
   
  };


  return router
};

export default buildCRUD;