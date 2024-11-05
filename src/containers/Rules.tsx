import * as React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const RulesContainer = styled.div`
  max-width: 500px;
  min-width: 400px;
`;

export interface RulesProps {

}

const Rules: React.FC<RulesProps> = () => {
  return (
    <PageContainer>
      <RulesContainer>
        <h2>Game Rules</h2>
        <p>This is web version of the classic <a
          href="https://en.wikipedia.org/wiki/Minesweeper_(video_game)"
          target="_blank">minesweeper puzzle.</a></p>
        <p>To win just mark all mines on the field!</p>
        <p><strong>Left click</strong> - Open a cell</p>
        <p><strong>Right click</strong> - Mark a cell as containing a mine</p>
        <p><strong>Double click</strong> - Smart move. Double click an opened
        cell which has a number inside to open all closed neighbor cells.
        But it works only If the number in the cell corresponds to a number
        of marked mines in the neighborhood.</p>
        <hr/>
        Source code on <a href="https://github.com/xitman78/react-minesweeper"
          target="_blank">GitHub</a>
        <p>Developed by <a href="https://alexander-cherepnya.netlify.com"
          target="_blank">Alexander Cherepnya</a></p>
      </RulesContainer>
    </PageContainer>
  );
};

export default Rules;
