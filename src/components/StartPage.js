import React from "react";
import PreGameSettings from "./PreGameSettings";
import {
  TitleContainer,
  PageTitle,
} from "../styled-components/styled-components";
import GolfIcon from "./GolfIcon";

const StartPage = () => {
  return (
    <>
      <TitleContainer>
        <PageTitle>start</PageTitle>
        <GolfIcon />
      </TitleContainer>
      <PreGameSettings />
    </>
  );
};

export default StartPage;
