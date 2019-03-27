import { createStore } from "redux";
import { game } from "./reducer";

export const store = createStore(
  game,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
