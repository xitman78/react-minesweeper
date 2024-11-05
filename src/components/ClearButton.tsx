import * as React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {GameState, GridState} from "../store/types";
import { newGame } from "../store/action";

const ClearButtonContainer = styled.button`
  margin-top: 20px;
  padding: 10px;
  border: none;
  background-color: #66cc66;
  font-size: 1.2em;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  outline: none;
  min-width: 100px;
  &:hover {
    background-color: #77dd77;
  }
`;

export interface ClearButtonProps {
  gameState: GameState;
  newGame: typeof newGame;
}

const ClearButton: React.FC<ClearButtonProps> = ({ gameState, newGame }) => {
  return (
    <ClearButtonContainer onClick={newGame}>
      {(gameState === "game" || gameState === "new") && "New"}
      {gameState === "win" && "😃"}
      {gameState === "over" && "😵"}
    </ClearButtonContainer>
  );
};

const mapStateToProps = (state: GridState) => ({
  gameState: state.gameState
});

export default connect(
  mapStateToProps,
  {
    newGame
  }
)(ClearButton);
