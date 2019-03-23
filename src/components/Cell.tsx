import * as React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { CellValue, GridState } from "../store/types";
import { cellClick, cellRightClick } from "../store/action";

export interface CellProps extends CellValue {
  rowIndex: number;
  colIndex: number;
  cellClick: typeof cellClick;
  cellRightClick: typeof cellRightClick;
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
  console.log("cell render");
  return (
    <CellWrapper
      onClick={() => props.cellClick(props.rowIndex, props.colIndex)}
      onContextMenu={() => props.cellRightClick(props.rowIndex, props.colIndex)}
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

const mapStateToProps = (
  state: GridState,
  ownProps: { rowIndex: number; colIndex: number }
) => ({
  ...state.rows[ownProps.rowIndex][ownProps.colIndex]
});

export default connect(
  mapStateToProps,
  {
    cellClick,
    cellRightClick
  }
)(Cell);
