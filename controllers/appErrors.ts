import { NextFunction, Request, Response } from "express";
import { IAppError } from "../utils/appError";

export default (err: IAppError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    res.status(err.statusCode).json({message: "Something went wrong.", err})
  };