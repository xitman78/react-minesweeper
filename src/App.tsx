import * as React from "react";
import styled from "styled-components";
import "./App.css";
import Grid from "./Grid";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

class App extends React.Component {
  render() {
    return (
      <MainContainer>
        <Grid rows={5} cols={5} />
      </MainContainer>
    );
  }
}

export default App;
