import Grid from "./Grid";
import { Cell, GridConfig } from "./Grid";
import CellularAutomataRule from "./CellularAutomataRule";

class CellularAutomata extends Grid {
  constructor(
    rule: CellularAutomataRule,
    initializer: GridConfig | Cell[][] | null = null
  ) {
    super(initializer);
    this.rule = rule;
  }
  ////////////////////////////////////////////////////////////////////////////
  public update() {
    const newCells = this.cells?.map((cellsRow) => [...cellsRow]);
    const { width, height } = this.size;
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const cellPosition = { x: j, y: i };
        newCells[i][j] = this.rule(this.cells, this.size, cellPosition);
      }
    }
    this.cells = newCells;
  }

  ////////////////////////////////////////////////////////////////////////////
  private rule: CellularAutomataRule;
}

export default CellularAutomata;
