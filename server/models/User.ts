import mongoose, { Schema } from "mongoose";
import User from "../types/User";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  hash: { type: String, required: true },
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.hash;
    delete returnedObject.__v;
  },
});

export default mongoose.model<User>("User", UserSchema);
