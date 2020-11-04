"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoute {
    constructor() {
        this.getIndex = (req, res) => {
            res.send("API avaible");
        };
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get("/", this.getIndex);
    }
}
const indexRoute = new IndexRoute();
exports.default = indexRoute.router;
//# sourceMappingURL=IndexRoute.js.map