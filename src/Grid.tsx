import * as React from "react";
import Row from "./Row";
import styled from "styled-components";
import { isFourInColumn } from "./utils";

const ClearButton = styled.button`
  margin-top: 10px;
  padding: 10px;
`;

export interface GridProps {
  rows: number;
  cols: number;
}

export interface GridState {
  rows: Array<Array<boolean>>;
  redColumns: Array<boolean>;
}

class Grid extends React.Component<GridProps, GridState> {
  constructor(props: GridProps) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleClear = this.handleClear.bind(this);

    this.state = this.getInitialState(props.rows, props.cols);
  }

  private getInitialState(rows: number, cols: number): GridState {
    return {
      rows: new Array(rows).fill([]).map(_ => new Array(cols).fill(false)),
      redColumns: new Array(cols).fill(false)
    };
  }

  handleOnChange(row: number, col: number) {
    this.setState(prevState => {
      const rows = prevState.rows.slice();
      rows[row][col] = !rows[row][col];
      const redColumns = prevState.redColumns.slice();
      redColumns[col] = isFourInColumn(rows, col);
      return {
        rows,
        redColumns
      };
    });
  }

  handleClear() {
    this.setState((_, props) => this.getInitialState(props.rows, props.cols));
  }

  render() {
    return (
      <div>
        {this.state.rows.map((row, rowIndex) => (
          <Row
            key={rowIndex}
            rowIndex={rowIndex}
            rowData={row}
            redColumns={this.state.redColumns}
            onChange={this.handleOnChange}
          />
        ))}
        <ClearButton onClick={this.handleClear}>Clear</ClearButton>
      </div>
    );
  }
}

export default Grid;
