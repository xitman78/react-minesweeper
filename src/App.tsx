import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from "./Grid";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Grid rows={5} cols={5} />
      </div>
    );
  }
}

export default App;
