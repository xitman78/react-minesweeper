import { createStore } from "redux";
import { getInitialState } from "../helpers/getInitialState";
import { GridState } from "../components/Grid";

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

type ActitionType = ClickAction | RightClickAction | ResetGame | NewGame;

function game(state: GridState | undefined, action: ActitionType): GridState {
  if (!state) {
    return getInitialState(10, 10, 10);
  }

  switch (action.type) {
    case "click":
      return state;
    case "rightClick":
      return state;
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

export const store = createStore(
  game,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
