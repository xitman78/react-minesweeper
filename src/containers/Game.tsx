import * as React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Grid from "../components/Grid";
import { resetGame } from "../store/action";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const InputsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Input = styled.input`
  margin-left: 10px;
  padding: 3px 10px;
  font-size: 14px;
  width: 50px;
`;

const Label = styled.label`
  margin-left: 40px;
  font-size: 12px;
  padding-top: 6px;
`;

interface AppState {
  rows: number;
  cols: number;
  mines: number;
}

export interface GameProps {
  resetGame: typeof resetGame;
}

class Game extends React.Component<GameProps, AppState> {
  constructor(props: GameProps) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      rows: 10,
      cols: 10,
      mines: 10
    };
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let num = parseInt(event.target.value, 10);
    if (isNaN(num) || num <= 0) {
      num = 1;
    }
    this.setState(
      // @ts-ignore
      {
        [event.target.name]: num
      },
      () => {
        this.props.resetGame(
          this.state.rows,
          this.state.cols,
          this.state.mines
        );
      }
    );
  }

  render() {
    return (
      <div>
        <InputsContainer>
          <Label htmlFor="rowsInput">Rows:</Label>
          <Input
            id="rowsInput"
            type="number"
            name="rows"
            value={this.state.rows}
            onChange={this.handleInputChange}
          />
          <Label htmlFor="colsInput">Columns:</Label>
          <Input
            id="colsInput"
            type="number"
            name="cols"
            value={this.state.cols}
            onChange={this.handleInputChange}
          />
          <Label htmlFor="colsInput">Mines:</Label>
          <Input
            id="minesInput"
            type="number"
            name="mines"
            value={this.state.mines}
            onChange={this.handleInputChange}
          />
        </InputsContainer>
        <MainContainer>
          <Grid />
        </MainContainer>
      </div>
    );
  }
}

export default connect(
  null,
  {
    resetGame
  }
)(Game);
