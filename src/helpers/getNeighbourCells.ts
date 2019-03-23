import { CellValue } from "../components/Grid";

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
  const topNeighbours: GetNeighbourCellsResposeItem[] =
    rowIndex === 0
      ? []
      : rows[rowIndex - 1]
          .slice(
            Math.max(cellIndex - 1, 0),
            Math.max(cellIndex - 1, 0) + (cellIndex === 0 ? 2 : 3)
          )
          .map((cell, i) => ({
            cell,
            rowIndex: rowIndex - 1,
            cellIndex: Math.max(cellIndex - 1, 0) + i
          }));

  const leftCell: GetNeighbourCellsResposeItem[] =
    cellIndex <= 0
      ? []
      : [
          {
            cell: rows[rowIndex][cellIndex - 1],
            rowIndex,
            cellIndex: cellIndex - 1
          }
        ];

  const rightCell: GetNeighbourCellsResposeItem[] =
    cellIndex >= rows[0].length - 1
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
          .slice(
            Math.max(cellIndex - 1, 0),
            Math.max(cellIndex - 1, 0) + (cellIndex === 0 ? 2 : 3)
          )
          .map((cell, i) => ({
            cell,
            rowIndex: rowIndex + 1,
            cellIndex: Math.max(cellIndex - 1, 0) + i
          }));

  return topNeighbours
    .concat(leftCell, rightCell, bottomNeighbours)
    .filter(cell => !cell.cell.isMine);
}
