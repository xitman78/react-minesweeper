import {
  ClickAction,
  DoubleClickAction,
  NewGame,
  ResetGame,
  RightClickAction
} from "./actionTypes";

export function newGame(): NewGame {
  return {
    type: "newGame"
  };
}

export function resetGame(
  rows: number,
  columns: number,
  mines: number
): ResetGame {
  return {
    type: "reset",
    rows,
    columns,
    mines
  };
}

export function cellClick(rowIndex: number, cellIndex: number): ClickAction {
  return {
    type: "click",
    rowIndex,
    cellIndex
  };
}

export function cellRightClick(
  rowIndex: number,
  cellIndex: number
): RightClickAction {
  return {
    type: "rightClick",
    rowIndex,
    cellIndex
  };
}

export function doubleClick(
  rowIndex: number,
  cellIndex: number
): DoubleClickAction {
  return {
    type: "doubleClick",
    rowIndex,
    cellIndex
  };
}
