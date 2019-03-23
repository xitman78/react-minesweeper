import * as React from "react";
import styled from "styled-components";
import Cell from "./Cell";
import { CellValue, GridState } from "./Grid";
import { connect } from "react-redux";

const RowWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export interface RowProps {
  rowData: CellValue[];
  rowIndex: number;
  // onChange: (row: number, col: number, action?: "click" | "rightClick") => void;
}

const Row: React.SFC<RowProps> = ({ rowData, rowIndex }) => {
  return (
    <RowWrapper>
      {rowData.map((cellValue, cellIndex) => (
        <Cell
          key={cellIndex}
          rowIndex={rowIndex}
          colIndex={cellIndex}
          {...cellValue}
        />
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
