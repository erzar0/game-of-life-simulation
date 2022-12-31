import { Size, Position, Cell } from "../../types/Grid";
import CellularAutomataRule from "../../types/CellularAutomataRule";

const getAvailableNieghbourPositions = (
  gridSize: Size,
  cellPosition: Position
): Position[] => {
  const availableNieghbourPositions: Position[] = [];
  const { width, height } = gridSize;
  const { x, y } = cellPosition;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j == 0) {
        continue;
      }
      const pos: Position = { x: x + j, y: y + i };
      if (pos.x >= 0 && pos.x < width && pos.y >= 0 && pos.y < height) {
        availableNieghbourPositions.push(pos);
      }
    }
  }
  return availableNieghbourPositions;
};
const getNeighbourCount = (
  cells: Cell[][],
  gridSize: Size,
  cellPosition: Position
): number => {
  let neighbourCount = 0;
  const positions = getAvailableNieghbourPositions(gridSize, cellPosition);
  positions.forEach(({ x, y }) => {
    if (cells[y][x] === 1) {
      neighbourCount += 1;
    }
  });
  return neighbourCount;
};

const gameOfLifeRule: CellularAutomataRule = (
  cells,
  gridSize,
  cellPosition
) => {
  const neighbourCount = getNeighbourCount(cells, gridSize, cellPosition);
  const { x, y } = cellPosition;
  if (cells[y][x] === 1 && (neighbourCount === 2 || neighbourCount === 3)) {
    return 1;
  } else if (cells[y][x] === 0 && neighbourCount === 3) {
    return 1;
  }
  return 0;
};

export default gameOfLifeRule;
