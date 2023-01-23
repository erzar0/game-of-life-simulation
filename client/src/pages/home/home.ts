import CellularAutomata from "../../types/CellularAutomata";
import CellularAutomataRenderer from "../../types/CellularAutomataRenderer";
import { GridConfig } from "../../types/Grid";
import gameOfLifeRule from "./gameOfLifeRule";
import gridConfigService from "../../services/gridConfig";
import { User } from "../../types/User";

function isEmptyArray(array: unknown) {
    if (!Array.isArray(array)) {
        return false;
    }
    if (array.length == 0) {
        return true;
    }
    return false;
}
const gridConfigDefault = {
      enabledCells: [
        { x: 1, y: 0 },
        { x: 2, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
      ],
      gridSize: { width: 10, height: 10 },
      name: "default",
    }

async function home(userGridConfigs: GridConfig[], currentUser: User | null) {
  const svgCanvas = document.getElementById(
    "svg-canvas"
  ) as unknown as SVGAElement;

  if (!userGridConfigs || isEmptyArray(userGridConfigs) ) {
    userGridConfigs = [];

   userGridConfigs.push(gridConfigDefault);
  }
   console.log(userGridConfigs)

  if (svgCanvas) {
    const stopBtn = document.getElementById("stop");
    const startBtn = document.getElementById("start");
    const clearBtn = document.getElementById("clear");

    const tickrateSlider = document.getElementById(
      "tickrate"
    ) as HTMLInputElement;
    const tickrateValue = document.getElementById(
      "tickrate-value"
    ) as HTMLSpanElement;

    const gridSizeSlider = document.getElementById("grid-size") as HTMLInputElement
    const gridSizeValue = document.getElementById("grid-size-value") as HTMLSpanElement

    const gridConfigSelect = document.getElementById(
      "grid-config"
    ) as HTMLSelectElement;

    const newGridConfigNameInput = document.getElementById(
      "new-grid-config"
    ) as HTMLInputElement;
    const saveGridConfigButton = document.getElementById(
      "save-new-grid-config"
    ) as HTMLButtonElement;

    userGridConfigs.forEach((cfg, idx) => {
      if(idx === 0)
      {
      gridSizeValue.innerText = `Grid size: ${cfg.gridSize.width}`
      gridSizeSlider.value = `${cfg.gridSize.width}`
      }
      const cfgOption = document.createElement("option") as HTMLOptionElement;
      if (cfg.name) {
        cfgOption.value = cfg.name;
        cfgOption.innerHTML = cfg.name;
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

    const stopRendering = () => {
      clearInterval(renderInterval);
      renderInterval = undefined;
    };
    const startRendering = () => {
      renderInterval = setInterval(() => {
        gameOfLifeRenderer.step();
      }, (1 / parseInt(tickrateSlider?.value)) * 1000);
    };
    const clearGrid = () => {
      gameOfLifeRenderer.clearCells();
    };
    const changeTickrate = (e: Event) => {
      if (renderInterval) {
        const tickrate = (e.target as unknown as HTMLInputElement).value;
        tickrateValue.innerText = `Tickrate: ${tickrate}`;
        clearInterval(renderInterval);
        renderInterval = setInterval(() => {
          gameOfLifeRenderer.step();
        }, (1 / parseInt(tickrate)) * 1000);
      }
    };
    const changeGridSize = (e: Event) => {
      const gridSize = parseInt((e.target  as unknown as HTMLInputElement).value)
      gridSizeValue.innerText = `Grid size: ${gridSize}`
        svgCanvas.innerHTML = "";
        const gameOfLife = new CellularAutomata(gameOfLifeRule, {...gridConfigDefault, gridSize:{width: gridSize, height: gridSize}});

        gameOfLifeRenderer.init(svgCanvas, gameOfLife);

    }
    const loadNewConfig = (e: Event) => {
      const configName = (e.target as HTMLSelectElement).value;
      const selectedConfig = userGridConfigs.find(
        (cfg) => cfg.name === configName
      );
      if (selectedConfig) {
        svgCanvas.innerHTML = "";
        const gameOfLife = new CellularAutomata(gameOfLifeRule, selectedConfig);

      gridSizeValue.innerText = `Grid size: ${selectedConfig.gridSize.width}`
      gridSizeSlider.value = `${selectedConfig.gridSize.width}`
        gameOfLifeRenderer.init(svgCanvas, gameOfLife);
      }
    };
    const saveGridConfig = async () => {
      const gridConfigName = newGridConfigNameInput.value;
      let gridConfig = gameOfLifeRenderer.$gridConfig;
      gridConfig = { ...gridConfig, name: gridConfigName };
      await gridConfigService.addUserConfig(gridConfig);
      window.location.reload();
    };

    stopBtn?.addEventListener("click", stopRendering);
    startBtn?.addEventListener("click", startRendering);
    clearBtn?.addEventListener("click", clearGrid);
    tickrateSlider?.addEventListener("change", changeTickrate);
    gridSizeSlider?.addEventListener("change", changeGridSize)
    gridConfigSelect?.addEventListener("change", loadNewConfig);
    saveGridConfigButton?.addEventListener("click", saveGridConfig);

    if (!currentUser) {
      Array.from(
        document.getElementsByClassName("logged-user-options")
      ).forEach((element) => {
        (element as HTMLElement).style.display = "None";
      });
    }
  }
}

export default home;
