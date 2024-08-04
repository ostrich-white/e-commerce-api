import { Request, Response, NextFunction,  Router } from 'express';
import { Model, Document } from 'mongoose';
import factory from "./factory";

const buildCRUD = <T extends Document>(model: Model<T>, router: Router= Router()) => {
  const { get, getAll, create, update, delete: deleteDoc } = factory(model);

  const controller = {
    async get(req: Request, res: Response, next: NextFunction) {
      try {
        const document = await get(req.params.id);
        if (!document) {
          return res.status(404).json({ message: 'Document not found' });
        }
        res.json(document);
      } catch (error) {
        next(error);
      }
    },

    async getAll(req: Request, res: Response, next: NextFunction) {
      try {
        const documents = await getAll();
        res.json(documents);
      } catch (error) {
        next(error);
      }
    },

    async create(req: Request, res: Response, next: NextFunction) {
      try {
        const document = await create(req.body);
        res.status(201).json(document);
      } catch (error) {
        next(error);
      }
    },

    async update(req: Request, res: Response, next: NextFunction) {
      try {
        const document = await update(req.params.id, req.body);
        if (!document) {
          return res.status(404).json({ message: 'Document not found' });
        }
        res.json(document);
      } catch (error) {
        next(error);
      }
    },

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

  router.get('/', controller.getAll);
  router.get('/:id', controller.get);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router
};

export default buildCRUD;