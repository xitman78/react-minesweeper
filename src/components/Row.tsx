import * as React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Cell from "./Cell";
import { CellValue, GridState } from "../store/types";

const RowWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export interface RowProps {
  rowData: CellValue[];
  rowIndex: number;
}

const Row: React.SFC<RowProps> = ({ rowData, rowIndex }) => {
  console.log("---- row render");
  return (
    <RowWrapper>
      {rowData.map((cellValue, cellIndex) => (
        <Cell key={cellIndex} rowIndex={rowIndex} colIndex={cellIndex} />
      ))}
    </RowWrapper>
  );
};

const mapStateToProps = (state: GridState, ownProps: { rowIndex: number }) => ({
  rowData: state.rows[ownProps.rowIndex]
});

export default connect(
  mapStateToProps,
  null
)(Row);
