import * as React from "react";
import styled from "styled-components";
import { Route, Routes, Link, HashRouter } from "react-router-dom";
import Game from "./containers/Game";
import Rules from "./containers/Rules";

const Menu = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const Nav = styled(Link)`
  margin-right: 16px;
`;

export interface AppRouterProps {}

class App extends React.Component<AppRouterProps> {
  render() {
    return (
      <div>
        <HashRouter>
          <>
            <Menu>
              <Nav to="/">Game</Nav>
              <Nav to="/about">Rules</Nav>
            </Menu>
            <Routes>
              <Route path="/" element={<Game/>} />
              <Route path="/about" element={<Rules/>} />
            </Routes>
          </>
        </HashRouter>
      </div>
    );
  }
}

export default App;
