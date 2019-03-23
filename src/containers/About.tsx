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

const About: React.SFC<AboutProps> = () => {
  return (
    <PageContainer>
      <AboutContainer>
        <h1>About Us</h1>
      </AboutContainer>
    </PageContainer>
  );
};

export default About;
