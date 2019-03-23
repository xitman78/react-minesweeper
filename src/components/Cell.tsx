import * as React from "react";
import styled from "styled-components";
import { CellValue } from "./Grid";

export interface CellProps extends CellValue {
  rowIndex: number;
  colIndex: number;
  // onChange: (row: number, col: number, action?: "click" | "rightClick") => void;
}

const CellContent = styled.div`
  font-size: 1.8em;
  user-select: none;
`;

const CellWrapper = styled("div")<{ isMine: boolean; isOpen: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  justify-content: center;

  @media (max-width: 700px) {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }

  margin: 3px;

  background-color: ${({ isOpen }) => (isOpen ? "orange" : "white")};

  &:hover {
    background-color: ${({ isOpen }) => (isOpen ? "#ffb510" : "#efefef")};
  }

  transition: background-color 0.3s ease-out;
`;

const Cell: React.SFC<CellProps> = props => {
  return (
    <CellWrapper
      onClick={() => null}
      onContextMenu={() => null}
      isMine={props.isMine}
      isOpen={props.isOpen}
    >
      {props.isOpen ? (
        <>
          {props.neighbourMines ? (
            <CellContent>{props.neighbourMines}</CellContent>
          ) : null}
          {props.isMine ? <CellContent>💣</CellContent> : null}
        </>
      ) : (
        props.isMarked && <CellContent>⚑</CellContent>
      )}
    </CellWrapper>
  );
};

// props.onChange(props.rowIndex, props.colIndex)
// props.onChange(props.rowIndex, props.colIndex, "rightClick"

export default Cell;
