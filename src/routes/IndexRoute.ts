import { Router, Response, Request } from "express";

class IndexRoute {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  getIndex = (req: Request, res: Response) => {
    res.send("API avaible");
  };

  routes() {
    this.router.get("/", this.getIndex);
  }
}

const indexRoute = new IndexRoute();

export default indexRoute.router;