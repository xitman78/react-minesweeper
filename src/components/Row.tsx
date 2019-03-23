import * as React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Cell from "./Cell";
import { GridState } from "../store/types";

const RowWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export interface RowProps {
  rowLength: number;
  rowIndex: number;
}

const Row: React.SFC<RowProps> = ({ rowLength, rowIndex }) => {
  console.log("---- row render");
  const cells: number[] = new Array(rowLength).fill(1).map((_, i) => i);
  return (
    <RowWrapper>
      {cells.map(cellIndex => (
        // @ts-ignore
        <Cell key={cellIndex} rowIndex={rowIndex} colIndex={cellIndex} />
      ))}
    </RowWrapper>
  );
};

const mapStateToProps = (state: GridState) => ({
  rowLength: state.rows[0].length
});

export default connect(
  mapStateToProps,
  null
)(Row);
