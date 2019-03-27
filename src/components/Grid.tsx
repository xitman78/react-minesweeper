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

const Grid: React.SFC<GridProps> = props => {
  return (
    <GridContainer
      onClick={event => {
        // @ts-ignore
        let dataset = event.target.dataset as any;
        if (dataset && dataset.type === "cell") {
          event.preventDefault();
          event.stopPropagation();
          props.cellClick(parseInt(dataset.row, 10), parseInt(dataset.col, 10));
        }
      }}
      onContextMenu={event => {
        // @ts-ignore
        let dataset = event.target.dataset as any;
        if (dataset && dataset.type === "cell") {
          event.preventDefault();
          event.stopPropagation();
          props.cellRightClick(
            parseInt(dataset.row, 10),
            parseInt(dataset.col, 10)
          );
        }
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
