import { GridState, CellValue } from "../store/types";
import { getNeighborCells } from "./getNeighborCells";

export function getInitialState(
  rows: number,
  cols: number,
  minesCount: number
): GridState {
  const minesArray = new Array(minesCount).fill(true);
  const notMineCellsCount = rows * cols - minesCount;
  const notMinesArray = new Array(
    notMineCellsCount >= 0 ? notMineCellsCount : 0
  ).fill(false);

  const mineSeeder = minesArray
    .concat(notMinesArray)
    .sort(() => Math.random() - 0.5); // shuffle seed array

  let seedCounter = 0;

  const allRows = new Array<Array<CellValue[]>>(rows).fill([]).map(_ =>
    new Array(cols)
      .fill({
        isMine: false,
        isOpen: false,
        isMarked: false,
        neighborMines: 0
      })
      .map(cell => ({
        ...cell,
        isMine: mineSeeder[seedCounter++]
      }))
  );

  for (let ri = 0; ri < rows; ri++) {
    for (let ci = 0; ci < cols; ci++) {
      if (allRows[ri][ci].isMine) {
        const neighborCells = getNeighborCells(allRows, ri, ci).filter(
          cell => !cell.cell.isMine
        );
        neighborCells.forEach(cell => {
          cell.cell.neighborMines++;
        });
      }
    }
  }

  return {
    rows: allRows,
    minesMarked: 0,
    cellsOpened: 0,
    gameState: "new",
    mines: minesCount
  };
}
