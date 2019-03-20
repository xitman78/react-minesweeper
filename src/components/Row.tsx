import * as React from "react";
import styled from "styled-components";
import Cell from "./Cell";
import { isFourInRow } from "../helpers/utils";
import { CellValue } from "./Grid";

const RowWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export interface RowProps {
  rowData: CellValue[];
  rowIndex: number;
  onChange: (row: number, col: number) => void;
}

const Row: React.SFC<RowProps> = ({ rowData, rowIndex, onChange }) => {
  return (
    <RowWrapper>
      {rowData.map((cellValue, cellIndex) => (
        <Cell
          key={cellIndex}
          rowIndex={rowIndex}
          colIndex={cellIndex}
          {...cellValue}
          onClick={() => onChange(rowIndex, cellIndex)}
        />
      ))}
    </RowWrapper>
  );
};

export default Row;
