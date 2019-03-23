import { NewGame } from "./store";

export function newGame(): NewGame {
  return {
    type: "newGame"
  };
}
