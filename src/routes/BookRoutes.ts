import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

import BookModel, { IBook } from "../models/BookModel";

class BookRoutes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  async getBooks(req: Request, res: Response) {
    res.status(200).json(await BookModel.find({ deletedAt: null }));
  }

  async getBook(req: Request, res: Response) {
    const { ISBN } = req.params;
    const book = await BookModel.findOne({ ISBN });
    if (book != null) res.status(200).json({ data: book });
    res.status(400).json({ error: "Libro no existente." });
  }

  async postBook(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const book = await BookModel.findOne({ ISBN: req.body.ISBN });
      if (book) res.status(400).json({ msg: "El libro ya existe" });

      const newBook: IBook = new BookModel(req.body);
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch {
      res
        .status(409)
        .json({ error: "Ha enviado un recurso en blanco o que ya existe." });
    }
  }

  async putBook(req: Request, res: Response) {
    const { ISBN } = req.params;
    const { title, author, editorial } = req.body;

    const book = await BookModel.findOne({ ISBN });
    if (!book) res.status(400).json({ msg: "El libro no existe" });

    const updateBook = await BookModel.findOneAndUpdate(
      { ISBN },
      { title, author, editorial, updatedAt: Date.now() },
      {
        new: true,
      }
    );
    res.status(200).json(updateBook);
  }

  async deleteBook(req: Request, res: Response) {
    const { ISBN } = req.params;

    const book = await BookModel.findOne({ ISBN });
    if (!book) res.status(400).json({ msg: "El libro no existe" });

    await BookModel.findOneAndUpdate({ ISBN }, { deletedAt: Date.now() });
    // await BookModel.findOneAndRemove({ ISBN });
    res.json({ data: `Libro con ISBN ${ISBN} eliminado correctamente` });
  }

  routes() {
    this.router.get("/", this.getBooks);
    this.router.get("/:ISBN", this.getBook);
    this.router.post(
      "/",
      [body("ISBN").not().isEmpty().isLength({ min: 10 })],
      this.postBook
    );
    this.router.put("/:ISBN", this.putBook);
    this.router.delete("/:ISBN", this.deleteBook);
  }
}

const bookRoutes = new BookRoutes();
export default bookRoutes.router;
