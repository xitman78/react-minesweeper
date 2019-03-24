import { CellValue } from "../store/types";
import { getNeighbourCells } from "./getNeighbourCells";

interface OpenCellsRecursevlyResponse {
  opened: number;
}

export function openCellsRecursevly(
  allRows: Array<CellValue[]>,
  rowIndex: number,
  cellIndex: number
): OpenCellsRecursevlyResponse {
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
  // else get all neighbour cells and call this function recursevly
  let cellsOpened = 1;

  const neighbourCells = getNeighbourCells(allRows, rowIndex, cellIndex).filter(
    cell => !cell.cell.isMine && !cell.cell.isMarked
  );

  for (let cell of neighbourCells) {
    const { opened } = openCellsRecursevly(
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
