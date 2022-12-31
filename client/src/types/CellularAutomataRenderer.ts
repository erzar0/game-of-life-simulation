import CellularAutomata from "./CellularAutomata";
import { Size } from "./Grid";
import { createSvgLine, createSvgRectangle } from "../utils/svgHelpers";

class CellularAutomataRenderer {
  constructor(svgCanvas: SVGAElement, cellularAutomata: CellularAutomata) {
    this.cellularAutomata = cellularAutomata;
    this.svgCanvas = svgCanvas;
    this.svgSize = {
      width: Number(svgCanvas.getAttribute("width")),
      height: Number(svgCanvas.getAttribute("height")),
    };
    this.initGridLayout();
    this.initRenderedCells();
  }

  public step(): void {
    this.cellularAutomata.update();
    const { width: gridWidth, height: gridHeight } =
      this.cellularAutomata.$size;
    for (let i = 0; i < gridHeight; i++) {
      for (let j = 0; j < gridWidth; j++) {
        if (this.cellularAutomata.$cells[i][j] === 1) {
          this.renderedCells[i][j].style.fill = "red";
        } else {
          this.renderedCells[i][j].style.fill = "white";
        }
      }
    }
  }

  public clearCells(): void {
    this.cellularAutomata.clearCells();
    this.step();
  }

  //////////////////////////////////////////////////////////////////////////////
  private svgCanvas: SVGAElement;
  private svgSize: Size;
  private cellularAutomata: CellularAutomata;
  private renderedCells: SVGElement[][] = [];
  //////////////////////////////////////////////////////////////////////////////
  private initGridLayout() {
    const { width: gridWidth, height: gridHeight } =
      this.cellularAutomata.$size;
    const { width: svgWidth, height: svgHeight } = this.svgSize;
    const dx = svgWidth / gridWidth;
    const dy = svgHeight / gridHeight;
    for (let i = 0; i <= gridHeight; i++) {
      const y = i * dy;
      this.svgCanvas.appendChild(createSvgLine(0, svgWidth, y, y));
    }
    for (let j = 0; j <= gridWidth; j++) {
      const x = j * dx;
      this.svgCanvas.appendChild(createSvgLine(x, x, 0, svgHeight));
    }
  }

  private initRenderedCells(): void {
    const { width: gridWidth, height: gridHeight } =
      this.cellularAutomata.$size;
    const { width: svgWidth, height: svgHeight } = this.svgSize;
    const dx = svgWidth / gridWidth;
    const dy = svgHeight / gridHeight;
    this.renderedCells = [];
    for (let i = 0; i < gridHeight; i++) {
      this.renderedCells[i] = [];
      for (let j = 0; j < gridWidth; j++) {
        const x = j * dx;
        const y = i * dy;
        const rect = createSvgRectangle(
          x,
          y,
          dx - 1,
          dy - 1,
          this.cellularAutomata.$cells[i][j] === 1 ? "red" : "white"
        );
        rect.addEventListener("pointerover", (e) => {
          const cell = this.cellularAutomata.$cells[i][j];
          if (cell === 0 && e.buttons === 1) {
            this.cellularAutomata.$cells[i][j] = 1;
            (e.target as SVGAElement).style.fill = "red";
          } else if (cell === 1 && e.buttons === 2) {
            this.cellularAutomata.$cells[i][j] = 0;
            (e.target as SVGAElement).style.fill = "white";
          }
        });

        rect.setAttribute("id", `${j},${i}`);
        this.renderedCells[i][j] = rect;
        this.svgCanvas.appendChild(rect);
      }
    }
  }
}

export default CellularAutomataRenderer;
