import CellularAutomata from "../../types/CellularAutomata";
import CellularAutomataRenderer from "../../types/CellularAutomataRenderer";
import { GridConfig } from "../../types/Grid";
import gameOfLifeRule from "./gameOfLifeRule";

async function home(userGridConfigs: GridConfig[]) {
  const svgCanvas = document.getElementById(
    "svg-canvas"
  ) as unknown as SVGAElement;

  if (svgCanvas) {
    const stopBtn = document.getElementById("stop");
    const startBtn = document.getElementById("start");
    const clearBtn = document.getElementById("clear");
    const tickrateSlider = document.getElementById(
      "tickrate"
    ) as HTMLInputElement;
    const gridConfigSelect = document.getElementById(
      "grid-config"
    ) as HTMLSelectElement;

    userGridConfigs.forEach((cfg, idx) => {
      const cfgOption = document.createElement("option") as HTMLOptionElement;
      if (cfg.id) {
        cfgOption.value = cfg.id;
        cfgOption.innerHTML = cfg.id;
      } else {
        cfgOption.value = String(idx);
        cfgOption.innerHTML = String(idx);
      }
      gridConfigSelect.append(cfgOption);
    });

    const gameOfLife = new CellularAutomata(gameOfLifeRule, userGridConfigs[0]);
    const gameOfLifeRenderer = new CellularAutomataRenderer(
      svgCanvas,
      gameOfLife
    );

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
    gridConfigSelect?.addEventListener("change", (e) => {
      const configId = (e.target as HTMLSelectElement).value;
      const config2load = userGridConfigs.find((cfg) => cfg.id === configId);
      if (config2load) {
        gameOfLife.loadFromConfig(config2load);
      }
      gameOfLifeRenderer.step();
    });
  }
}

export default home;
