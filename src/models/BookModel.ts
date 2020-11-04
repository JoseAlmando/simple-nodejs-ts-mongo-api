import { Schema, model, Document } from "mongoose";

export interface IBook extends Document{
  ISBN: string;
  title: string;
  author: String;
  editorial: String;
}

const bookModel = new Schema({
  ISBN: { type: String, unique: true },
  title: { type: String, required: true },
  author: String,
  editorial: String,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: Date,
  deletedAt:  { type: Date, default: "" },
});

export default model<IBook>("Book", bookModel);
