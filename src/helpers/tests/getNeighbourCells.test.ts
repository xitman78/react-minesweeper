import { getNeighbourCells } from "../getNeighbourCells";
import { getInitialState } from "../getInitialState";

it("should return eight cells if target cell is not on the border", () => {
  const state = getInitialState(5, 5, 5);

  const neighbourCells = getNeighbourCells(state.rows, 3, 3);

  expect(neighbourCells.length).toBe(8);
});

it("should return three cells if target cell is in the corner", () => {
  const state = getInitialState(5, 5, 5);

  let neighbourCells = getNeighbourCells(state.rows, 0, 0);
  expect(neighbourCells.length).toBe(3);

  neighbourCells = getNeighbourCells(state.rows, 4, 0);
  expect(neighbourCells.length).toBe(3);

  neighbourCells = getNeighbourCells(state.rows, 4, 4);
  expect(neighbourCells.length).toBe(3);

  neighbourCells = getNeighbourCells(state.rows, 0, 4);
  expect(neighbourCells.length).toBe(3);
});

it("should return five cells if target cell is on the border but not in the corner", () => {
  const state = getInitialState(5, 5, 5);

  let neighbourCells = getNeighbourCells(state.rows, 0, 2);
  expect(neighbourCells.length).toBe(5);

  neighbourCells = getNeighbourCells(state.rows, 1, 4);
  expect(neighbourCells.length).toBe(5);

  neighbourCells = getNeighbourCells(state.rows, 4, 3);
  expect(neighbourCells.length).toBe(5);

  neighbourCells = getNeighbourCells(state.rows, 3, 0);
  expect(neighbourCells.length).toBe(5);
});

it("should return zero cells if grid is 1 x 1", () => {
  const state = getInitialState(1, 1, 1);

  let neighbourCells = getNeighbourCells(state.rows, 0, 0);
  expect(neighbourCells.length).toBe(0);
});
