import * as React from "react";
import styled from "styled-components";
import "./App.css";
import Grid from "./Grid";

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
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      rows: 5,
      cols: 5
    };
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    let num = parseInt(event.target.value, 10);
    if (isNaN(num) || num <= 0) {
      num = 1;
    }
    // @ts-ignore
    this.setState({
      [event.target.name]: num
    });
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
        </InputsContainer>
        <MainContainer>
          <Grid rows={this.state.rows} cols={this.state.cols} />
        </MainContainer>
      </div>
    );
  }
}

export default App;
