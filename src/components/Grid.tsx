import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import Row from "./Row";
import styled from "styled-components";

const GridContainer = styled.div`
  margin-top: 20px;
  border-radius: 30px;
  padding: 20px;
  text-align: center;
  background-color: #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ClearButton = styled.button`
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

export interface GridProps {
  rows: number;
  cols: number;
  mines: number;
}

export interface CellValue {
  isMine: boolean;
  isOpen: boolean;
  neighbourMines: number;
}

export interface GridState {
  rows: Array<Array<CellValue>>;
}

function getInitialState(
  rows: number,
  cols: number,
  minesCount: number
): GridState {
  const minesArray = new Array(minesCount).fill(true);
  const notMineCellsCount = rows * cols - minesCount;
  const notMinesArray = new Array(
    notMineCellsCount >= 0 ? notMineCellsCount : 0
  ).fill(false);

  const mineSeeder = minesArray
    .concat(notMinesArray)
    .sort(() => Math.random() - 0.5); // shuffle seed array

  let seedCounter = 0;

  return {
    rows: new Array<Array<CellValue[]>>(rows).fill([]).map(_ =>
      new Array(cols)
        .fill({
          isMine: false,
          isOpen: false,
          neighbourMines: 0
        })
        .map(cell => ({
          ...cell,
          isMine: mineSeeder[seedCounter++]
        }))
    )
  };
}

const Grid: React.SFC<GridProps> = props => {
  const initialState = useMemo(
    () => getInitialState(props.rows, props.cols, props.mines),
    [props.rows, props.cols, props.mines]
  );

  const [state, setState] = useState<GridState>(initialState);

  useMemo(() => {
    console.log("use memo 2");
    setState(getInitialState(props.rows, props.cols, props.mines));
  }, [props.rows, props.cols, props.mines]);

  function handleOnChange(row: number, col: number) {
    setState(prevState => {
      const rows = prevState.rows.slice();
      rows[row] = rows[row].slice();
      rows[row][col] = {
        ...rows[row][col],
        isOpen: !rows[row][col].isOpen
      };
      return {
        rows,
        mines: props.mines
      };
    });
  }

  console.log("render ---");

  return (
    <GridContainer>
      {state.rows.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          rowIndex={rowIndex}
          rowData={row}
          onChange={handleOnChange}
        />
      ))}
      <ClearButton
        onClick={() =>
          setState(getInitialState(props.rows, props.cols, props.mines))
        }
      >
        Clear
      </ClearButton>
    </GridContainer>
  );
};

export default Grid;
