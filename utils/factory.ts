import { Model, Document } from 'mongoose';

interface IFactory<T extends Document> {
  get(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
  create(doc: Partial<T>): Promise<T>;
  update(id: string, doc: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}

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

  async getAll() {
    try {
      const documents = await model.find();
      return documents;
    } catch (error) {
      console.error('Error fetching documents:', error);
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