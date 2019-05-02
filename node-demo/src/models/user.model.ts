import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  }
});
