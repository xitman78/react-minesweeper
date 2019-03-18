import * as React from "react";
import styled from "styled-components";
import Cell from "./Cell";
import { isFourInRow } from "../helpers/utils";

const RowWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export interface RowProps {
  rowData: boolean[];
  redColumns: boolean[];
  rowIndex: number;
  onChange: (row: number, col: number) => void;
}

const Row: React.SFC<RowProps> = ({
  rowData,
  rowIndex,
  redColumns,
  onChange
}) => {
  const isRedRow = isFourInRow(rowData);
  return (
    <RowWrapper>
      {rowData.map((cellValue, cellIndex) => (
        <Cell
          key={cellIndex}
          rowIndex={rowIndex}
          colIndex={cellIndex}
          isActive={cellValue}
          isRed={redColumns[cellIndex] || isRedRow}
          onClick={() => onChange(rowIndex, cellIndex)}
        />
      ))}
    </RowWrapper>
  );
};

export default Row;
