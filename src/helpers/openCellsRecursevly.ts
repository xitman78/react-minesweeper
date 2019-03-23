import { CellValue } from "../components/Grid";
import { getNeighbourCells } from "./getNeighbourCells";

interface OpenCellsRecursevlyResponse {
  rows: Array<CellValue[]>;
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
      rows: allRows,
      opened: 0
    };
  }
  allRows[rowIndex] = allRows[rowIndex].slice(); // copy row
  allRows[rowIndex][cellIndex].isOpen = true;
  if (allRows[rowIndex][cellIndex].neighbourMines > 0) {
    // there are neighbour mines - open only one cell
    return {
      rows: allRows,
      opened: 1
    };
  }
  // else get all neighbour cells and call this function recursevly
  let cellsOpened = 1;

  const heighbourCells = getNeighbourCells(allRows, rowIndex, cellIndex);

  for (let cell of heighbourCells) {
    const { opened } = openCellsRecursevly(
      allRows,
      cell.rowIndex,
      cell.cellIndex
    );
    cellsOpened += opened;
  }

  return {
    rows: allRows,
    opened: cellsOpened
  };
}
