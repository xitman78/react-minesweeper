export function isFourInRow(row: boolean[]): boolean {
  let counter = 0;
  for (let val of row) {
    if (val) {
      counter++;
      if (counter === 4) {
        return true;
      }
    } else {
      counter = 0;
    }
  }
  return false;
}

export function isFourInColumn(
  data: Array<boolean[]>,
  colIndex: number
): boolean {
  let counter = 0;
  for (let row of data) {
    if (row[colIndex]) {
      counter++;
      if (counter === 4) {
        return true;
      }
    } else {
      counter = 0;
    }
  }
  return false;
}
