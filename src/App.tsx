import * as React from "react";
import styled from "styled-components";
import { Route, Switch, Link, HashRouter } from "react-router-dom";
import Game from "./containers/Game";
import About from "./containers/About";

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
              <Nav to="/about">About</Nav>
            </Menu>
            <Switch>
              <Route exact path="/" component={Game} />
              <Route exact path="/about" component={About} />
            </Switch>
          </>
        </HashRouter>
      </div>
    );
  }
}

export default App;
