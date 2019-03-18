import * as React from "react";
import styled from "styled-components";
import { Route, Switch, Link } from "react-router-dom";
import FourInRowPage from "./containers/FourInRow";
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
        <Menu>
          <Nav to="/">Home</Nav>
          <Nav to="/about">About</Nav>
        </Menu>
        <Switch>
          <Route exact path="/" component={FourInRowPage} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
