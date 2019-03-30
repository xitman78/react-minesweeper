import { CellValue } from "../store/types";

export interface GetNeighborCellsResponseItem {
  cell: CellValue;
  rowIndex: number;
  cellIndex: number;
}

export function getNeighborCells(
  rows: Array<CellValue[]>,
  rowIndex: number,
  cellIndex: number
): Array<GetNeighborCellsResponseItem> {
  const startCellIndex = Math.max(cellIndex - 1, 0);
  const endCellIndex = startCellIndex + (cellIndex === 0 ? 2 : 3);
  const topNeighbors: GetNeighborCellsResponseItem[] =
    rowIndex === 0
      ? []
      : rows[rowIndex - 1]
          .slice(startCellIndex, endCellIndex)
          .map((cell, i) => ({
            cell,
            rowIndex: rowIndex - 1,
            cellIndex: startCellIndex + i
          }));

  const leftCell: GetNeighborCellsResponseItem[] =
    cellIndex === 0
      ? []
      : [
          {
            cell: rows[rowIndex][cellIndex - 1],
            rowIndex,
            cellIndex: cellIndex - 1
          }
        ];

  const rightCell: GetNeighborCellsResponseItem[] =
    cellIndex === rows[0].length - 1
      ? []
      : [
          {
            cell: rows[rowIndex][cellIndex + 1],
            rowIndex,
            cellIndex: cellIndex + 1
          }
        ];

  const bottomNeighbors: GetNeighborCellsResponseItem[] =
    rowIndex === rows.length - 1
      ? []
      : rows[rowIndex + 1]
          .slice(startCellIndex, endCellIndex)
          .map((cell, i) => ({
            cell,
            rowIndex: rowIndex + 1,
            cellIndex: startCellIndex + i
          }));

  return topNeighbors.concat(leftCell, rightCell, bottomNeighbors);
}
