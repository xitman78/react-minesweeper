export type GameState = "new" | "game" | "win" | "over";

export interface CellValue {
  isMine: boolean;
  isOpen: boolean;
  isMarked: boolean;
  neighborMines: number;
}

export interface GridState {
  rows: Array<Array<CellValue>>;
  minesMarked: number;
  cellsOpened: number;
  mines: number;
  gameState: GameState;
}
