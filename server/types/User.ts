import mongoose, { Document } from "mongoose";

export default interface User extends Document {
  username: string;
  hash?: string;
  gridConfigs: [mongoose.Types.ObjectId];
}
