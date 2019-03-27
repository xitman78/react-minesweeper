import { CellValue } from "../store/types";
import {
  getNeighbourCells,
  GetNeighbourCellsResposeItem
} from "./getNeighbourCells";
import { openCellsRecursively } from "./openCellsRecursevly";

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
  const neighbourCells = getNeighbourCells(allRows, rowIndex, cellIndex);
  const minesMarked = neighbourCells.filter(cell => cell.cell.isMarked).length;
  if (minesMarked !== cell.neighbourMines) {
    return { opened: 0 };
  }
  const notOpenedCells = neighbourCells.filter(
    cell => !cell.cell.isOpen && !cell.cell.isMarked && !cell.cell.isMine
  );

  let totalOpened = 0;

  console.log("notOpenedCells", notOpenedCells);

  const nextCycleCells: Array<GetNeighbourCellsResposeItem> = [];

  for (const sealedCell of notOpenedCells) {
    if (sealedCell.cell.neighbourMines === 0) {
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
