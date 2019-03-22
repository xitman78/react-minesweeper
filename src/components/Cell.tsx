import * as React from "react";
import styled from "styled-components";
import { CellValue } from "./Grid";

export interface CellProps extends CellValue {
  rowIndex: number;
  colIndex: number;
  onChange: (row: number, col: number) => void;
}

const CellWrapper = styled("div")<{ isMine: boolean; isOpen: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  font-size: 2em;
  display: flex;
  align-items: center;

  @media (max-width: 700px) {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }

  margin: 3px;
  display: inline-block;
  background-color: ${({ isOpen }) => (isOpen ? "orange" : "white")};

  &:hover {
    background-color: ${({ isOpen }) => (isOpen ? "#ffb510" : "#efefef")};
  }

  transition: background-color 0.3s ease-out;
`;

const Cell: React.SFC<CellProps> = props => {
  return (
    <CellWrapper
      onClick={() => props.onChange(props.rowIndex, props.colIndex)}
      isMine={props.isMine}
      isOpen={props.isOpen}
    >
      {props.neighbourMines ? <div>{props.neighbourMines}</div> : null}
      {props.isMine ? <div>💣</div> : null}
    </CellWrapper>
  );
};

export default Cell;
