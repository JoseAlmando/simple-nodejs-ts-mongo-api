import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import IndexRoute from "./routes/IndexRoute";
import BookRoutes from "./routes/BookRoutes";

class Server {
  app: Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    const MONGO_URL = "mongodb://localhost/test";
    mongoose.set("useFindAndModify", true);
    mongoose
      .connect(process.env.MONGO_URL || MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then((db) => console.log("Db is conected"));
    this.app.set("port", 3000);

    // Middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  routes() {
    this.app.use(IndexRoute);
    this.app.use("/api/book", BookRoutes);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
