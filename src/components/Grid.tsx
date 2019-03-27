import * as React from "react";
import Row from "./Row";
import styled from "styled-components";
import { connect } from "react-redux";
import ClearButton from "./ClearButton";
import { GridState } from "../store/types";
import Timer from "./Timer";
import { cellClick, cellRightClick } from "../store/action";

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
  rowsCount: number;
  cellClick: typeof cellClick;
  cellRightClick: typeof cellRightClick;
}

function clickHandler(
  event: React.MouseEvent,
  handler: typeof cellClick | typeof cellRightClick
) {
  if (event.target instanceof HTMLDivElement) {
    let dataset = event.target.dataset;
    if (dataset && dataset.type === "cell") {
      if (!dataset.row || !dataset.col) {
        return;
      }
      const rowIndex = parseInt(dataset.row, 10);
      const cellIndex = parseInt(dataset.col, 10);
      if (isNaN(rowIndex) || isNaN(cellIndex)) {
        console.error("invalid cell index");
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      handler(rowIndex, cellIndex);
    }
  }
}

const Grid: React.SFC<GridProps> = props => {
  return (
    <GridContainer
      onClick={event => clickHandler(event, props.cellClick)}
      onContextMenu={event => clickHandler(event, props.cellRightClick)}
      onDoubleClick={event => {
        console.log("onDoubleClick");
      }}
    >
      <Timer />
      {new Array(props.rowsCount).fill(0).map((_, rowIndex) => (
        <Row key={rowIndex} rowIndex={rowIndex} />
      ))}
      <ClearButton />
    </GridContainer>
  );
};

const mapStateToProps = (state: GridState) => ({
  rowsCount: state.rows.length
});

export default connect(
  mapStateToProps,
  {
    cellClick,
    cellRightClick
  }
)(Grid);
