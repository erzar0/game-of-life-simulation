interface Position {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface GridConfig {
  enabledCells: Position[];
  gridSize: Size;
}

type Cell = 1 | 0;

export { Position, Size, GridConfig, Cell };

export default class Grid {
  constructor(initializer: GridConfig | Cell[][] | null = null) {
    if (Array.isArray(initializer)) {
      this.cells = initializer;
    } else if (initializer !== null) {
      this.loadFromConfig(initializer);
    } else {
      this.cells = [
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
    }
    this.size = { height: this.cells?.length, width: this.cells[0].length };
  }
  public print() {
    let grid = "";
    const { width, height } = this.size;
    if (this.cells) {
      for (let i = 0; i < height; i++) {
        let row = "";
        for (let j = 0; j < width; j++) {
          row += this.cells[i][j] === 1 ? "#" : ".";
        }
        grid += "\n" + row;
      }
      console.log(grid);
    }
  }
  public loadFromConfig(config: GridConfig) {
    if (config?.gridSize !== undefined) {
      this.initCells(config?.gridSize);
    }
    config?.enabledCells.forEach(({ x, y }) => {
      if (this.cells) {
        this.cells[y][x] = 1;
      }
    });
  }
  ////////////////////////////////////////////////////////////////////////////
  protected cells: Cell[][] = [[1]];
  protected size: Size = { height: 1, width: 1 };
  private initCells(size: Size) {
    this.cells = [];
    for (let i = 0; i < size.height; i++) {
      this.cells[i] = [];
      for (let j = 0; j < size.width; j++) {
        this.cells[i][j] = 0;
      }
    }
  }
}
