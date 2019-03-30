import { getInitialState } from "../getInitialState";
import { getNeighborCells } from "../getNeighborCells";

it("Should create state with correct dimentions", () => {
  const state = getInitialState(10, 10, 10);

  expect(state.rows.length).toBe(10);
  expect(state.rows[0].length).toBe(10);
  expect(state.mines).toBe(10);
});

it("Should contain correct number of mines in array", () => {
  const state = getInitialState(10, 10, 10);
  // calculate number of mines in matrix
  let counter = 0;
  for (const row of state.rows) {
    for (const cell of row) {
      if (cell.isMine) {
        counter++;
      }
    }
  }
  expect(counter).toBe(10);
});

it("Should calculate correctly number of neightbour mines", () => {
  const state = getInitialState(10, 10, 10);

  for (let ri = 0; ri < 10; ri++) {
    for (let ci = 0; ci < 10; ci++) {
      if (state.rows[ri][ci].isMine === false) {
        const neighborMineCells = getNeighborCells(state.rows, ri, ci).filter(
          cell => cell.cell.isMine
        );
        expect(state.rows[ri][ci].neighborMines).toBe(neighborMineCells.length);
      }
    }
  }
});
