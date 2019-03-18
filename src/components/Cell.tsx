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
  border-radius: 10px;

  @media (max-width: 700px) {
    width: 60px;
    height: 60px;
    border-radius: 8px;
  }

  margin: 3px;
  display: inline-block;
  background-color: ${({ isRed, isActive }) =>
    isRed ? "red" : isActive ? "orange" : "white"};

  &:hover {
    background-color: ${({ isRed, isActive }) =>
      isRed ? "#ff5353" : isActive ? "#ffb510" : "#efefef"};
  }

  transition: background-color 0.3s ease-out;
`;

export default Cell;
