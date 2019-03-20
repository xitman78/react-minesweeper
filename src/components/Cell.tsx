import * as React from "react";
import styled from "styled-components";
import { CellValue } from "./Grid";

export interface CellProps extends CellValue {
  rowIndex: number;
  colIndex: number;
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
  background-color: ${({ isMine, isOpen }) =>
    isMine ? "red" : isOpen ? "orange" : "white"};

  &:hover {
    background-color: ${({ isMine, isOpen }) =>
      isMine ? "#ff5353" : isOpen ? "#ffb510" : "#efefef"};
  }

  transition: background-color 0.3s ease-out;
`;

export default Cell;
