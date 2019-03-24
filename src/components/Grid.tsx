import * as React from "react";
import Row from "./Row";
import styled from "styled-components";
import { connect } from "react-redux";
import ClearButton from "./ClearButton";
import { GridState } from "../store/types";
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
  rowsCount: number;
}

const Grid: React.SFC<GridProps> = props => {
  return (
    <GridContainer
      onContextMenu={event => {
        event.preventDefault();
        event.stopPropagation();
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
  null
)(Grid);
