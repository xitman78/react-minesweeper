import { getInitialState } from "../helpers/getInitialState";
import { GridState, GameState } from "./types";
import { openCellsRecursively } from "../helpers/openCellsRecursively";
import {
  ClickAction,
  DoubleClickAction,
  RightClickAction,
  ResetGame,
  NewGame
} from "./actionTypes";
import { handleDoubleClickRecursively } from "../helpers/handleDoubleClickRecursively";

type ActionType =
  | ClickAction
  | DoubleClickAction
  | RightClickAction
  | ResetGame
  | NewGame;

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

      const cell = state.rows[action.rowIndex][action.cellIndex];

      if (cell.isOpen || cell.isMarked) {
        return state; // already open or marked
      }

      if (cell.isMine) {
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

      if (!cell.isOpen && cell.neighborMines === 0) {
        // user clicked on free cell - open free cells recursevly
        const { opened } = openCellsRecursively(
          rows,
          action.rowIndex,
          action.cellIndex
        );

        if (
          minesMarked === state.mines &&
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
        ...cell,
        isOpen: true
      };

      cellsOpened++; // one cell is opened

      if (
        minesMarked === state.mines &&
        cellsOpened + minesMarked === state.rows.length * state.rows[0].length
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

    case "rightClick": {
      if (state.gameState !== "game" && state.gameState !== "new") {
        return state;
      }

      const cell = state.rows[action.rowIndex][action.cellIndex];

      if (cell.isOpen) {
        return state; // already opened and cannot be marked
      }

      const rows = state.rows.slice();

      const minesMarked = state.minesMarked + (cell.isMarked ? -1 : 1);
      rows[action.rowIndex][action.cellIndex] = {
        ...cell,
        isMarked: !cell.isMarked
      };

      let gameState: GameState = "game";

      if (
        minesMarked === state.mines &&
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
    }

    case "doubleClick": {
      if (state.gameState !== "game") {
        return state;
      }

      const cell = state.rows[action.rowIndex][action.cellIndex];
      if (!cell.isOpen || cell.isMarked || cell.neighborMines === 0) {
        return state;
      }
      const rows = state.rows.slice(); // copy main array
      const { opened } = handleDoubleClickRecursively(
        rows,
        action.rowIndex,
        action.cellIndex
      );

      if (opened === 0) {
        return state;
      }

      let gameState: GameState = "game";

      if (
        state.minesMarked === state.mines &&
        state.cellsOpened + opened + state.minesMarked ===
          state.rows.length * state.rows[0].length
      ) {
        // victory
        console.log("!!!!!!!!!!!!!victoria!!!!!!!!!!!!!!!!!! 111");
        gameState = "win";
      }

      return {
        rows,
        minesMarked: state.minesMarked,
        cellsOpened: state.cellsOpened + opened,
        gameState: gameState,
        mines: state.mines
      };
    }

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
