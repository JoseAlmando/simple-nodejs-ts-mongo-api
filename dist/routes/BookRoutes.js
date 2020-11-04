"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const BookModel_1 = __importDefault(require("../models/BookModel"));
class BookRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json(yield BookModel_1.default.find({ deletedAt: null }));
        });
    }
    getBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ISBN } = req.params;
            const book = yield BookModel_1.default.findOne({ ISBN });
            res.status(200).json({ data: book });
        });
    }
    postBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = express_validator_1.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const newBook = new BookModel_1.default(req.body);
            const savedBook = yield newBook.save();
            res.json(savedBook);
        });
    }
    putBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ISBN } = req.params;
            const { title, author, editorial } = req.body;
            const updateBook = yield BookModel_1.default.findOneAndUpdate({ ISBN }, { title, author, editorial, updatedAt: Date.now() }, {
                new: true,
            });
            res.json(updateBook);
        });
    }
    deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ISBN } = req.params;
            const { title, author, editorial } = req.body;
            yield BookModel_1.default.findOneAndUpdate({ ISBN }, { deletedAt: Date.now() });
            // await BookModel.findOneAndRemove({ ISBN });
            res.json({ data: `Libro con ISBN ${ISBN} eliminado correctamente` });
        });
    }
    routes() {
        this.router.get("/", this.getBooks);
        this.router.get("/:ISBN", this.getBook);
        this.router.post("/", [express_validator_1.body("ISBN").not().isEmpty().isLength({ min: 10 })], this.postBook);
        this.router.put("/:ISBN", this.putBook);
        this.router.delete("/:ISBN", this.deleteBook);
    }
}
const bookRoutes = new BookRoutes();
exports.default = bookRoutes.router;
//# sourceMappingURL=BookRoutes.js.map