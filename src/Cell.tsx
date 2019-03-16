import * as React from "react";
import styled from "styled-components";

export interface CellProps {
  rowIndex: number;
  colIndex: number;
  isActive: boolean;
  isRed: boolean;
}

const Cell = styled("div")<CellProps>`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 2px;
  display: inline-block;
  background-color: ${({ isRed, isActive }) =>
    isRed ? "red" : isActive ? "orange" : "white"};
`;

export default Cell;
