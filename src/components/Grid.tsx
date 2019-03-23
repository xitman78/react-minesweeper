import * as React from "react";
import Row from "./Row";
import styled from "styled-components";
import { connect } from "react-redux";
import ClearButton from "./ClearButton";
import { CellValue, GridState } from "../store/types";
import Timer from "./Timer";

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
}

const Grid: React.SFC<GridProps> = props => {
  console.log("render ---");

  return (
    <GridContainer
      onContextMenu={event => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <Timer />
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
