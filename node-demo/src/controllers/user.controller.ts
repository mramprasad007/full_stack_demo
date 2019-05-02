import { Request, Response } from "express";
import mongoose from "mongoose";
import { UserSchema } from "../models/user.model";
const User = mongoose.model("User", UserSchema);
export class UserController {
  public addNewUser(req: Request, res: Response) {
    const newUser = new User(req.body);
    newUser.save((err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json({ status: "true" });
    });
  }

  public getUser(req: Request, res: Response) {
    User.find({}, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  }
}
