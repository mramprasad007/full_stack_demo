import * as bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import { Routes } from "./routes/user.route";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string = "mongodb://mongo:27017/db2";

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      this.mongoUrl,
      { useNewUrlParser: true}
    );
  }
}

export default new App().app;
