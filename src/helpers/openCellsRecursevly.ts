import { CellValue } from "../store/types";
import { getNeighbourCells } from "./getNeighbourCells";

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
  if (allRows[rowIndex][cellIndex].neighbourMines > 0) {
    // there are neighbour mines - open only one cell
    return {
      opened: 1
    };
  }
  // else get all neighbour cells and call this function recursively
  let cellsOpened = 1;

  const neighbourCells = getNeighbourCells(allRows, rowIndex, cellIndex).filter(
    cell => !cell.cell.isMine && !cell.cell.isMarked
  );

  for (let cell of neighbourCells) {
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
