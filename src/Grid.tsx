import * as React from "react";
import { useState, useMemo } from "react";
import Row from "./Row";
import styled from "styled-components";
import { isFourInColumn } from "./utils";

const GridContainer = styled.div`
  margin-top: 20px;
  border-radius: 30px;
  padding: 20px;
  text-align: center;
  background-color: #ddd;
`;

const ClearButton = styled.button`
  margin-top: 20px;
  padding: 10px 30px;
  border: none;
  background-color: #66cc66;
  font-size: 1.2em;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #77dd77;
  }
`;

export interface GridProps {
  rows: number;
  cols: number;
}

export interface GridState {
  rows: Array<Array<boolean>>;
  redColumns: Array<boolean>;
}

function getInitialState(rows: number, cols: number): GridState {
  return {
    rows: new Array(rows).fill([]).map(_ => new Array(cols).fill(false)),
    redColumns: new Array(cols).fill(false)
  };
}

const Grid: React.SFC<GridProps> = props => {
  const initialState = useMemo(() => getInitialState(props.rows, props.cols), [
    props.rows,
    props.cols
  ]);

  const [state, setState] = useState<GridState>(initialState);

  function handleOnChange(row: number, col: number) {
    setState(prevState => {
      const rows = prevState.rows.slice();
      rows[row] = rows[row].slice();
      rows[row][col] = !rows[row][col];
      const redColumns = prevState.redColumns.slice();
      redColumns[col] = isFourInColumn(rows, col);
      return {
        rows,
        redColumns
      };
    });
  }

  return (
    <GridContainer>
      {state.rows.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          rowIndex={rowIndex}
          rowData={row}
          redColumns={state.redColumns}
          onChange={handleOnChange}
        />
      ))}
      <ClearButton onClick={() => setState(initialState)}>Clear</ClearButton>
    </GridContainer>
  );
};

export default Grid;
