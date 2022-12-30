import CellularAutomata from "../../types/CellularAutomata";
import CellularAutomataRenderer from "../../types/CellularAutomataRenderer";
import gameOfLifeRule from "./gameOfLife/gameOfLifeRule";

async function home() {
  const svgCanvas = document.getElementById(
    "svg-canvas"
  ) as unknown as SVGAElement;
  console.log(svgCanvas.getBBox());

  if (svgCanvas) {
    const gameOfLife = new CellularAutomata(gameOfLifeRule, null);
    const gameOfLifeRenderer = new CellularAutomataRenderer(
      svgCanvas,
      gameOfLife
    );
    setInterval(() => {
      gameOfLifeRenderer.updateAndRender();
    }, 1000);
  }
}

export default home;
