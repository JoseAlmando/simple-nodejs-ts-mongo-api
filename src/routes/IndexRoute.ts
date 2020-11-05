import { Router, Response, Request } from "express";

class IndexRoute {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  getIndex = (req: Request, res: Response) => {
    res.send(`
          Rutas: \n
          GET /api/book
          GET /api/book/:ISBN \n
          POST /api/book \n
          PUT /api/book/:ISBN \n
          DELETE /api/book/:ISBN \n
    `);
  };

  routes() {
    this.router.get("/", this.getIndex);
  }
}

const indexRoute = new IndexRoute();

export default indexRoute.router;