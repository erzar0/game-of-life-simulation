import "./index.css";
import gameOfLifeRule from "./src/gameOfLifeRule";
import loadLayout from "./src/layout/loadLayout";
import CellularAutomata from "./src/types/CellularAutomata";

(async () => {
  loadLayout();
  const gol = new CellularAutomata(gameOfLifeRule, null);
  setInterval(() => {
    console.clear();
    gol.print();
    gol.update();
  }, 200);
})();
