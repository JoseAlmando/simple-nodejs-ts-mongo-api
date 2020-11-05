import { Router, Response, Request } from "express";

class IndexRoute {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  getIndex = (req: Request, res: Response) => {
    res.send(`
          Rutas: 
          GET /api/book
          GET /api/book/:ISBN
          POST /api/book
          PUT /api/book/:ISBN
          DELETE /api/book/:ISBN
    `);
  };

  routes() {
    this.router.get("/", this.getIndex);
  }
}

const indexRoute = new IndexRoute();

export default indexRoute.router;