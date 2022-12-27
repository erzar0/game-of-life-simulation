import "./index.css";
import loadLayout from "./layout/loadLayout";
import Grid from "./types/Grid";

(async () => {
  loadLayout();
  const grid = new Grid();
  grid.print();
})();
