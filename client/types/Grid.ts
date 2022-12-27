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

export default class Grid {
  constructor(initializer: GridConfig | Cell[][] | null = null) {
    if (Array.isArray(initializer)) {
      this.Cells = initializer;
    } else if (initializer !== null) {
      this.loadFromConfig(initializer);
    } else {
      this.Cells = [
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
  }
  //   public updateState() {
  //     let cellsCopy = this.Cells?.map(cellsRow => [...cellsRow])
  //     for(let i = this.Cells?.length; i++)
  //     {
  //         for(let j = this.Cells[0].length; j++)
  //         {

  //         }
  //     }
  //   }
  public print() {
    let grid = "";
    if (this.Cells) {
      for (let i = 0; i < this.Cells.length; i++) {
        let row = "";
        for (let j = 0; j < this.Cells[0].length; j++) {
          row += this.Cells[i][j] === 1 ? "#" : " ";
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
      if (this.Cells) {
        this.Cells[y][x] = 1;
      }
    });
  }

  private Cells: Cell[][] | null = null;
  private initCells(size: Size) {
    this.Cells = [];
    for (let i = 0; i < size.height; i++) {
      this.Cells[i] = [];
      for (let j = 0; j < size.width; j++) {
        this.Cells[i][j] = 0;
      }
    }
  }
  public getSize(): Size {
    if (this.Cells) {
      return { width: this.Cells?.length, height: this.Cells[0].length };
    }
    return { width: 0, height: 0 };
  }
  private getNeighbourCount(): number[][] | null {
    const neighbourCount: number[][] = [];
    const { height, width } = this.getSize();
    if (this.Cells) {
      for (let i = 0; i < height; i++) {
        neighbourCount[i] = [];
        for (let j = 0; j < width; j++) {
          let count = 0;
          const positions = this.getNeighbourPositions({ x: j, y: i });
          positions.forEach(({ x, y }) => {
            if (this.Cells && this.Cells[y][x] === 1) {
              count += 1;
            }
          });
          neighbourCount[i][j] = count;
        }
      }
      return neighbourCount;
    }
    return null;
  }

  private getNeighbourPositions(cellPosition: Position): Position[] {
    const neighbourPositions: Position[] = [];
    const { width, height } = this.getSize();
    const { x, y } = cellPosition;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const pos: Position = { x: x + j, y: y + i };
        if (pos.x >= 0 && pos.x < width && pos.y >= 0 && pos.y <= height) {
          neighbourPositions.push(pos);
        }
      }
    }
    return neighbourPositions;
  }
}
