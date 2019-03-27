import * as React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { CellValue, GridState } from "../store/types";

export interface CellProps extends CellValue {
  rowIndex: number;
  colIndex: number;
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
  const dataSet = {
    "data-type": "cell",
    "data-row": props.rowIndex,
    "data-col": props.colIndex
  };
  return (
    <CellWrapper isMine={props.isMine} isOpen={props.isOpen} {...dataSet}>
      {props.isOpen ? (
        <>
          {props.neighbourMines ? (
            <CellContent {...dataSet}>{props.neighbourMines}</CellContent>
          ) : null}
          {props.isMine ? <CellContent {...dataSet}>💣</CellContent> : null}
        </>
      ) : (
        props.isMarked && <CellContent {...dataSet}>⚑</CellContent>
      )}
    </CellWrapper>
  );
};

const mapStateToProps = (
  state: GridState,
  ownProps: { rowIndex: number; colIndex: number }
) => {
  return state.rows[ownProps.rowIndex][ownProps.colIndex];
};

export default connect(
  mapStateToProps,
  null
)(Cell);
