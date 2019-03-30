import { CellValue } from "../store/types";
import { getNeighborCells } from "./getNeighborCells";

interface OpenCellsRecursivelyResponse {
  opened: number;
}

export function openCellsRecursively(
  allRows: Array<CellValue[]>,
  rowIndex: number,
  cellIndex: number
): OpenCellsRecursivelyResponse {
  if (allRows[rowIndex][cellIndex].isOpen) {
    // already opened
    return {
      opened: 0
    };
  }
  allRows[rowIndex] = allRows[rowIndex].slice(); // copy row
  allRows[rowIndex][cellIndex] = {
    ...allRows[rowIndex][cellIndex],
    isOpen: true
  };
  if (allRows[rowIndex][cellIndex].neighborMines > 0) {
    // there are neighbor mines - open only one cell
    return {
      opened: 1
    };
  }
  // else get all neighbor cells and call this function recursively
  let cellsOpened = 1;

  const neighborCells = getNeighborCells(allRows, rowIndex, cellIndex).filter(
    cell => !cell.cell.isMine && !cell.cell.isMarked
  );

  for (let cell of neighborCells) {
    const { opened } = openCellsRecursively(
      allRows,
      cell.rowIndex,
      cell.cellIndex
    );
    cellsOpened += opened;
  }

  return {
    opened: cellsOpened
  };
}
