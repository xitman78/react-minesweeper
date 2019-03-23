import { NewGame, ClickAction, RightClickAction } from "./store";

export function newGame(): NewGame {
  return {
    type: "newGame"
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
