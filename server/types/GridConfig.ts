interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

// interface GridConfig {
//   enabledCells: Position[];
//   gridSize: Size;
// }

import { Document, Types } from "mongoose";

export default interface GridConfig extends Document {
  enabledCells: Position[];
  gridSize: Size;
  name: string;
  user: { type: Types.ObjectId };
}

// export default GridCsonfig;
//
