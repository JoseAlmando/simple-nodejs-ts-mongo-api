"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookModel = new mongoose_1.Schema({
    ISBN: { type: String, unique: true },
    title: { type: String, required: true },
    author: String,
    editorial: String,
    createdAt: { type: Date, default: Date.now() },
    updatedAt: Date,
    deletedAt: { type: Date, default: "" },
});
exports.default = mongoose_1.model("Book", bookModel);
//# sourceMappingURL=BookModel.js.map