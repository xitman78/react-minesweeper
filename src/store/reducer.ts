import { getInitialState } from "../helpers/getInitialState";
import { GridState, GameState } from "./types";
import { openCellsRecursively } from "../helpers/openCellsRecursevly";

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

export interface ResetGame {
  type: "reset";
  rows: number;
  columns: number;
  mines: number;
}

export interface NewGame {
  type: "newGame";
}

type ActionType = ClickAction | RightClickAction | ResetGame | NewGame;

export function game(
  state: GridState | undefined,
  action: ActionType
): GridState {
  if (!state) {
    return getInitialState(10, 10, 10);
  }

  switch (action.type) {
    case "click": {
      if (state.gameState !== "game" && state.gameState !== "new") {
        return state;
      }

      if (
        state.rows[action.rowIndex][action.cellIndex].isOpen ||
        state.rows[action.rowIndex][action.cellIndex].isMarked
      ) {
        return state; // already open or marked
      }

      if (state.rows[action.rowIndex][action.cellIndex].isMine) {
        // game over
        return {
          rows: state.rows.map(row =>
            row.map(cell => ({ ...cell, isOpen: true }))
          ),
          minesMarked: 0,
          cellsOpened: state.rows.length * state.rows[0].length,
          gameState: "over",
          mines: state.mines
        };
      }

      let cellsOpened = state.cellsOpened;
      let minesMarked = state.minesMarked;
      let gameState: GameState = "game";

      const rows = state.rows.slice(); // copy main array

      if (
        !rows[action.rowIndex][action.cellIndex].isOpen &&
        rows[action.rowIndex][action.cellIndex].neighbourMines === 0
      ) {
        // user clicked on free cell - open free cells recursevly
        const { opened } = openCellsRecursively(
          rows,
          action.rowIndex,
          action.cellIndex
        );

        if (
          cellsOpened + opened + minesMarked ===
          state.rows.length * state.rows[0].length
        ) {
          // victory
          console.log("!!!!!!!!!!!!!victoria!!!!!!!!!!!!!!!!!!");
          gameState = "win";
        }

        return {
          rows,
          minesMarked,
          cellsOpened: cellsOpened + opened,
          gameState,
          mines: state.mines
        };
      }

      rows[action.rowIndex] = rows[action.rowIndex].slice();

      rows[action.rowIndex][action.cellIndex] = {
        ...rows[action.rowIndex][action.cellIndex],
        isOpen: true
      };

      cellsOpened++; // one cell is opened

      if (
        cellsOpened + minesMarked ===
        state.rows.length * state.rows[0].length
      ) {
        // victory
        console.log("!!!!!!!!!!!!!victoria!!!!!!!!!!!!!!!!!!");
        gameState = "win";
      }

      return {
        rows,
        minesMarked,
        cellsOpened,
        gameState,
        mines: state.mines
      };
    }

    case "rightClick":
      if (state.gameState !== "game" && state.gameState !== "new") {
        return state;
      }

      if (state.rows[action.rowIndex][action.cellIndex].isOpen) {
        return state; // already opened and cannot be marked
      }

      const rows = state.rows.slice();

      const minesMarked =
        state.minesMarked +
        (rows[action.rowIndex][action.cellIndex].isMarked ? -1 : 1);
      rows[action.rowIndex][action.cellIndex] = {
        ...rows[action.rowIndex][action.cellIndex],
        isMarked: !rows[action.rowIndex][action.cellIndex].isMarked
      };

      let gameState: GameState = "game";

      if (
        state.cellsOpened + minesMarked ===
        state.rows.length * state.rows[0].length
      ) {
        // victory
        console.log("!!!!!!!!!!!!!victoria!!!!!!!!!!!!!!!!!!");
        gameState = "win";
      }

      return {
        rows,
        minesMarked,
        cellsOpened: state.cellsOpened,
        gameState: gameState,
        mines: state.mines
      };

    case "reset":
      return getInitialState(action.rows, action.columns, action.mines);

    case "newGame":
      return getInitialState(
        state.rows.length,
        state.rows[0].length,
        state.mines
      );
    default:
      return state;
  }
}
