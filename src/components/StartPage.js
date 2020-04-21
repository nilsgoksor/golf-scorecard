import React from "react";
import PreGameSettings from "./PreGameSettings";
import {
  TitleContainer,
  PageTitle,
} from "../styled-components/styled-components";
import GolfIcon from "./GolfIcon";

const StartPage = ({ history }) => {
  return (
    <>
      <TitleContainer>
        <PageTitle>start</PageTitle>
        <GolfIcon />
      </TitleContainer>
      <PreGameSettings history={history} />
    </>
  );
};

export default StartPage;
