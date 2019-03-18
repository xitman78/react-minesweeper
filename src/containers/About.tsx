import * as React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Dispatch } from "redux";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AboutContainer = styled.div`
  max-width: 1024px;
  min-width: 600px;
`;

export interface AboutProps {
  counter: number;
  increment: () => void;
  decrement: () => void;
}

const About: React.SFC<AboutProps> = ({ counter, increment, decrement }) => {
  return (
    <PageContainer>
      <AboutContainer>
        <h1>About Us</h1>
        Counter: {counter}
        <hr />
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </AboutContainer>
    </PageContainer>
  );
};

const mapStateToProps = (state: number) => ({
  counter: state
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  increment: () => dispatch({ type: "INCREMENT" }),
  decrement: () => dispatch({ type: "DECREMENT" })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
