import { CellValue } from "../store/types";

interface GetNeighbourCellsResposeItem {
  cell: CellValue;
  rowIndex: number;
  cellIndex: number;
}

export function getNeighbourCells(
  rows: Array<CellValue[]>,
  rowIndex: number,
  cellIndex: number
): Array<GetNeighbourCellsResposeItem> {
  const startCellIndex = Math.max(cellIndex - 1, 0);
  const endCellIndex = startCellIndex + (cellIndex === 0 ? 2 : 3);
  const topNeighbours: GetNeighbourCellsResposeItem[] =
    rowIndex === 0
      ? []
      : rows[rowIndex - 1]
          .slice(startCellIndex, endCellIndex)
          .map((cell, i) => ({
            cell,
            rowIndex: rowIndex - 1,
            cellIndex: startCellIndex + i
          }));

  const leftCell: GetNeighbourCellsResposeItem[] =
    cellIndex === 0
      ? []
      : [
          {
            cell: rows[rowIndex][cellIndex - 1],
            rowIndex,
            cellIndex: cellIndex - 1
          }
        ];

  const rightCell: GetNeighbourCellsResposeItem[] =
    cellIndex === rows[0].length - 1
      ? []
      : [
          {
            cell: rows[rowIndex][cellIndex + 1],
            rowIndex,
            cellIndex: cellIndex + 1
          }
        ];

  const bottomNeighbours: GetNeighbourCellsResposeItem[] =
    rowIndex === rows.length - 1
      ? []
      : rows[rowIndex + 1]
          .slice(startCellIndex, endCellIndex)
          .map((cell, i) => ({
            cell,
            rowIndex: rowIndex + 1,
            cellIndex: startCellIndex + i
          }));

  return topNeighbours
    .concat(leftCell, rightCell, bottomNeighbours)
    .filter(cell => !cell.cell.isMine);
}
