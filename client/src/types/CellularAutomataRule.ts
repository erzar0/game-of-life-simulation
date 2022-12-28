import { Position, Cell, Size } from "./Grid";

interface CellularAutomataRule {
  (cells: Cell[][], gridSize: Size, cellPosition: Position): Cell;
}
export default CellularAutomataRule;
