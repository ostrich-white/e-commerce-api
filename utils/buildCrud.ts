import { Request, Response, NextFunction,  Router } from 'express';
import { Model, Document } from 'mongoose';
import factory from "../controllers/factory";

const buildCRUD = <T extends Document>(model: Model<T>, router: Router= Router()) => {
  const { delete: deleteDoc } = factory(model);

  const controller = {
    async delete(req: Request, res: Response, next: NextFunction) {
      try {
        const document = await deleteDoc(req.params.id);
        if (!document) {
          return res.status(404).json({ message: 'Document not found' });
        }
        res.status(204).send();
      } catch (error) {
        next(error);
      }
    }
  };

  router.delete('/:id', controller.delete);

  return router
};

export default buildCRUD;