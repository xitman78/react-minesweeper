export interface ClickAction {
  type: "click";
  rowIndex: number;
  cellIndex: number;
}

export interface RightClickAction {
  type: "rightClick";
  rowIndex: number;
  cellIndex: number;
}

export interface DoubleClickAction {
  type: "doubleClick";
  rowIndex: number;
  cellIndex: number;
}

export interface ResetGame {
  type: "reset";
  rows: number;
  columns: number;
  mines: number;
}

export interface NewGame {
  type: "newGame";
}
