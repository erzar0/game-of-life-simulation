import CellularAutomata from "../../types/CellularAutomata";
import CellularAutomataRenderer from "../../types/CellularAutomataRenderer";
import gameOfLifeRule from "./gameOfLifeRule";

async function home() {
  const svgCanvas = document.getElementById(
    "svg-canvas"
  ) as unknown as SVGAElement;

  if (svgCanvas) {
    const gameOfLife = new CellularAutomata(gameOfLifeRule, null);
    const gameOfLifeRenderer = new CellularAutomataRenderer(
      svgCanvas,
      gameOfLife
    );

    const stopBtn = document.getElementById("stop");
    const startBtn = document.getElementById("start");
    const clearBtn = document.getElementById("clear");
    const tickrateSlider = document.getElementById(
      "tickrate"
    ) as HTMLInputElement;
    let renderInterval: number | undefined;

    stopBtn?.addEventListener("click", () => {
      clearInterval(renderInterval);
      renderInterval = undefined;
    });
    startBtn?.addEventListener("click", () => {
      renderInterval = setInterval(() => {
        gameOfLifeRenderer.step();
      }, (1 / parseInt(tickrateSlider?.value)) * 1000);
    });
    clearBtn?.addEventListener("click", () => {
      gameOfLifeRenderer.clearCells();
    });
    tickrateSlider?.addEventListener("change", (e) => {
      if (renderInterval) {
        clearInterval(renderInterval);
        renderInterval = setInterval(() => {
          gameOfLifeRenderer.step();
        }, (1 / parseInt((e.target as unknown as HTMLInputElement).value)) * 1000);
      }
    });
  }
}

export default home;
