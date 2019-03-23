import * as React from "react";
import { useState, useMemo } from "react";
import Row from "./Row";
import styled from "styled-components";
import { openCellsRecursevly } from "../helpers/openCellsRecursevly";
import { getNeighbourCells } from "../helpers/getNeighbourCells";

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
  isMarked: boolean;
  neighbourMines: number;
}

export interface GridState {
  rows: Array<Array<CellValue>>;
  minesMarked: number;
  cellsOpened: number;
  gameState: "new" | "game" | "win" | "over";
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

  const allRows = new Array<Array<CellValue[]>>(rows).fill([]).map(_ =>
    new Array(cols)
      .fill({
        isMine: false,
        isOpen: false,
        isMarked: false,
        neighbourMines: 0
      })
      .map(cell => ({
        ...cell,
        isMine: mineSeeder[seedCounter++]
      }))
  );

  for (let ri = 0; ri < rows; ri++) {
    for (let ci = 0; ci < cols; ci++) {
      if (allRows[ri][ci].isMine) {
        const neighbourCells = getNeighbourCells(allRows, ri, ci);
        neighbourCells.forEach(cell => {
          cell.cell.neighbourMines++;
        });
      }
    }
  }

  return {
    rows: allRows,
    minesMarked: 0,
    cellsOpened: 0,
    gameState: "new"
  };
}

const Grid: React.SFC<GridProps> = props => {
  const initialState = useMemo(
    () => getInitialState(props.rows, props.cols, props.mines),
    [props.rows, props.cols, props.mines]
  );

  const [state, setState] = useState<GridState>(initialState);

  useMemo(() => {
    // console.log("use memo 2");
    setState(getInitialState(props.rows, props.cols, props.mines));
  }, [props.rows, props.cols, props.mines]);

  function handleOnChange(
    row: number,
    col: number,
    action: "click" | "rightClick" = "click"
  ) {
    if (state.gameState !== "game" && state.gameState !== "new") {
      return;
    }
    if (action === "click") {
      if (state.rows[row][col].isOpen || state.rows[row][col].isMarked) {
        return; // already open or marked
      }
    }
    if (action === "rightClick") {
      if (state.rows[row][col].isOpen) {
        return; // already opened and cannot be marked
      }
    }
    setState(prevState => {
      if (action === "click" && state.rows[row][col].isMine) {
        // game over
        return {
          rows: state.rows.map(row =>
            row.map(cell => ({ ...cell, isOpen: true }))
          ),
          minesMarked: 0,
          cellsOpened: props.cols * props.rows,
          gameState: "over"
        };
      }

      let cellsOpened = prevState.cellsOpened;
      let minesMarked = prevState.minesMarked;
      let gameState = prevState.gameState;

      const rows = prevState.rows.slice(); // copy main array

      if (
        action === "click" &&
        !rows[row][col].isOpen &&
        rows[row][col].neighbourMines === 0
      ) {
        // user clicked on free cell - open free cells recursevly
        const { opened } = openCellsRecursevly(prevState.rows, row, col);
        console.log("opened", opened);
        return {
          rows,
          minesMarked,
          cellsOpened: cellsOpened + opened,
          gameState
        };
      }

      rows[row] = rows[row].slice();

      if (action === "rightClick") {
        minesMarked =
          prevState.minesMarked + (rows[row][col].isMarked ? -1 : 1);
        rows[row][col] = {
          ...rows[row][col],
          isMarked: !rows[row][col].isMarked
        };
      } else {
        cellsOpened++;
        rows[row][col] = {
          ...rows[row][col],
          isOpen: true
        };
      }

      if (cellsOpened + minesMarked === props.cols * props.cols) {
        // victory
        console.log("!!!!!!!!!!!!!victoria!!!!!!!!!!!!!!!!!!");
        gameState = "win";
      }

      return {
        rows,
        minesMarked,
        cellsOpened,
        gameState
      };
    });
  }

  console.log("render ---");

  return (
    <GridContainer
      onContextMenu={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
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
        {state.gameState === "game" || (state.gameState === "new" && "New")}
        {state.gameState === "win" && "😃"}
        {state.gameState === "over" && "😵"}
      </ClearButton>
    </GridContainer>
  );
};

export default Grid;
