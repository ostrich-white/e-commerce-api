import { NextFunction, Request, Response } from "express"

type controller = (req: Request, res: Response, next: NextFunction) => Promise<any>

export default (fn: controller) =>
    (req: Request, res: Response, next: NextFunction): void => {
        fn(req, res, next).catch(next)
    }
