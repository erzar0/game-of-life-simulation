import CellularAutomata from "./CellularAutomata";
import { Size } from "./Grid";
function createSvgElement(elem: string) {
  return document.createElementNS("http://www.w3.org/2000/svg", elem);
}
function createSvgLine(x1: number, x2: number, y1: number, y2: number) {
  const line = createSvgElement("line");
  line.setAttribute("x1", x1.toString());
  line.setAttribute("x2", x2.toString());
  line.setAttribute("y1", y1.toString());
  line.setAttribute("y2", y2.toString());
  line.style.stroke = "gray";
  line.style.strokeWidth = "1";
  return line;
}

function createSvgRectangle(
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) {
  const rect = createSvgElement("rect");
  rect.setAttribute("x", x.toString());
  rect.setAttribute("y", y.toString());
  rect.setAttribute("width", width.toString());
  rect.setAttribute("height", height.toString());
  // rect.style.stroke = color;
  rect.style.fill = color;
  return rect;
}

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

  public updateAndRender(): void {
    console.log(this.cellularAutomata);
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
    console.log(this.svgSize);
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
        this.renderedCells[i][j] = rect;
        this.svgCanvas.appendChild(rect);
      }
    }
  }
}

export default CellularAutomataRenderer;
