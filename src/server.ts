import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport";

dotenv.config();

import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import IndexRoute from "./routes/IndexRoute";
import BookRoutes from "./routes/BookRoutes";
import UserRoutes from "./routes/UserRoutes";
import passportMiddlewares from "./middlewares/passport";
import "./database/database";
class Server {
  app: Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set("port", process.env.PORT || 3000);

    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(passport.initialize());
    passport.use(passportMiddlewares);
  }

  routes() {
    this.app.use(IndexRoute);
    this.app.use("/api/book", BookRoutes);
    this.app.use(UserRoutes);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
