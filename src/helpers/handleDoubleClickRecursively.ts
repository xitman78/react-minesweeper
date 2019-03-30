import { CellValue } from "../store/types";
import {
  getNeighborCells,
  GetNeighborCellsResponseItem
} from "./getNeighborCells";
import { openCellsRecursively } from "./openCellsRecursively";

interface HandleDoubleClickRecursivelyResponse {
  opened: number;
}

export function handleDoubleClickRecursively(
  allRows: Array<CellValue[]>,
  rowIndex: number,
  cellIndex: number
): HandleDoubleClickRecursivelyResponse {
  const cell = allRows[rowIndex][cellIndex];
  if (!cell.isOpen) {
    return { opened: 0 };
  }
  const neighborCells = getNeighborCells(allRows, rowIndex, cellIndex);
  const minesMarked = neighborCells.filter(cell => cell.cell.isMarked).length;
  if (minesMarked !== cell.neighborMines) {
    return { opened: 0 };
  }
  const notOpenedCells = neighborCells.filter(
    cell => !cell.cell.isOpen && !cell.cell.isMarked && !cell.cell.isMine
  );

  let totalOpened = 0;

  const nextCycleCells: Array<GetNeighborCellsResponseItem> = [];

  for (const sealedCell of notOpenedCells) {
    // this is needed if this cell was already opened by another cell
    if (allRows[sealedCell.rowIndex][sealedCell.cellIndex].isOpen) {
      continue; // already opened
    }

    if (sealedCell.cell.neighborMines === 0) {
      const { opened } = openCellsRecursively(
        allRows,
        sealedCell.rowIndex,
        sealedCell.cellIndex
      );
      totalOpened += opened;
    } else {
      allRows[sealedCell.rowIndex] = allRows[sealedCell.rowIndex].slice(); // copy row
      allRows[sealedCell.rowIndex][sealedCell.cellIndex] = {
        ...sealedCell.cell,
        isOpen: true
      };
      totalOpened++;
      nextCycleCells.push(sealedCell);
    }
  }

  for (const openedCell of nextCycleCells) {
    const { opened } = handleDoubleClickRecursively(
      allRows,
      openedCell.rowIndex,
      openedCell.cellIndex
    );
    totalOpened += opened;
  }

  return {
    opened: totalOpened
  };
}
