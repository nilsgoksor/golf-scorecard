import React from "react";
import {
  TitleContainer,
  PageTitle,
} from "../styled-components/styled-components";
import GolfIcon from "../components/GolfIcon";
import styled from "styled-components";

const NotFoundPage = () => {
  return (
    <>
      <TitleContainer>
        <PageTitle>ball out of bounds</PageTitle>
        <GolfIcon />
      </TitleContainer>
      <ErrorLink href="/">Page does not exist. Return to homepage?</ErrorLink>
    </>
  );
};

export default NotFoundPage;

const ErrorLink = styled.a`
  text-decoration: none;
  color: ${(p) => p.theme.color.white};
`;
