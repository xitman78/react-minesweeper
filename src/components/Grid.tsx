import * as React from "react";
import Row from "./Row";
import styled from "styled-components";
import { connect } from "react-redux";
import ClearButton from "./ClearButton";

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

export interface GridProps {
  rows: Array<CellValue[]>;
  // cols: number;
  // mines: number;
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
  mines: number;
  gameState: "new" | "game" | "win" | "over";
}

const Grid: React.SFC<GridProps> = props => {
  // const initialState = useMemo(
  //   () => getInitialState(props.rows, props.cols, props.mines),
  //   [props.rows, props.cols, props.mines]
  // );

  // const [state, setState] = useState<GridState>(initialState);

  // useMemo(() => {
  //   // console.log("use memo 2");
  //   setState(getInitialState(props.rows, props.cols, props.mines));
  // }, [props.rows, props.cols, props.mines]);

  // function handleOnChange(
  //   row: number,
  //   col: number,
  //   action: "click" | "rightClick" = "click"
  // ) {
  //   if (state.gameState !== "game" && state.gameState !== "new") {
  //     return;
  //   }
  //   if (action === "click") {
  //     if (state.rows[row][col].isOpen || state.rows[row][col].isMarked) {
  //       return; // already open or marked
  //     }
  //   }
  //   if (action === "rightClick") {
  //     if (state.rows[row][col].isOpen) {
  //       return; // already opened and cannot be marked
  //     }
  //   }
  //   setState(prevState => {
  //     if (action === "click" && state.rows[row][col].isMine) {
  //       // game over
  //       return {
  //         rows: state.rows.map(row =>
  //           row.map(cell => ({ ...cell, isOpen: true }))
  //         ),
  //         minesMarked: 0,
  //         cellsOpened: props.cols * props.rows,
  //         gameState: "over"
  //       };
  //     }

  //     let cellsOpened = prevState.cellsOpened;
  //     let minesMarked = prevState.minesMarked;
  //     let gameState = prevState.gameState;

  //     const rows = prevState.rows.slice(); // copy main array

  //     if (
  //       action === "click" &&
  //       !rows[row][col].isOpen &&
  //       rows[row][col].neighbourMines === 0
  //     ) {
  //       // user clicked on free cell - open free cells recursevly
  //       const { opened } = openCellsRecursevly(prevState.rows, row, col);
  //       console.log("opened", opened);
  //       return {
  //         rows,
  //         minesMarked,
  //         cellsOpened: cellsOpened + opened,
  //         gameState
  //       };
  //     }

  //     rows[row] = rows[row].slice();

  //     if (action === "rightClick") {
  //       minesMarked =
  //         prevState.minesMarked + (rows[row][col].isMarked ? -1 : 1);
  //       rows[row][col] = {
  //         ...rows[row][col],
  //         isMarked: !rows[row][col].isMarked
  //       };
  //     } else {
  //       cellsOpened++;
  //       rows[row][col] = {
  //         ...rows[row][col],
  //         isOpen: true
  //       };
  //     }

  //     if (cellsOpened + minesMarked === props.cols * props.cols) {
  //       // victory
  //       console.log("!!!!!!!!!!!!!victoria!!!!!!!!!!!!!!!!!!");
  //       gameState = "win";
  //     }

  //     return {
  //       rows,
  //       minesMarked,
  //       cellsOpened,
  //       gameState
  //     };
  //   });
  // }

  console.log("render ---");

  return (
    <GridContainer
      onContextMenu={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      {props.rows.map((row, rowIndex) => (
        <Row key={rowIndex} rowIndex={rowIndex} />
      ))}
      <ClearButton />
    </GridContainer>
  );
};

const mapStateToProps = (state: GridState) => ({
  rows: state.rows
});

export default connect(
  mapStateToProps,
  null
)(Grid);
