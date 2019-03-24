import { NewGame, ResetGame, ClickAction, RightClickAction } from "./store";
import { number } from "prop-types";

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
