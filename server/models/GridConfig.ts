import mongoose, { Schema } from "mongoose";
import GridConfig from "../types/GridConfig";

var CellSchema = new mongoose.Schema(
  {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  { _id: false }
);

const GridConfigSchema: Schema = new Schema<GridConfig>({
  enabledCells: [CellSchema],

  gridSize: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
});

GridConfigSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model<GridConfig>("GridConfig", GridConfigSchema);
