import { NextFunction, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";

export class Routes {
  public userController: UserController = new UserController();

  public routes(app): void {
    app.route("/api").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "page loaded"
      });
    });

    app
      .route("/api/users")
      .get(this.userController.getUser)
      .post(this.userController.addNewUser);
  }
}
