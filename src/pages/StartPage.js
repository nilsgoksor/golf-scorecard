import React from "react";
import PreGameSettings from "../components/PreGameSettings";
import {
  TitleContainer,
  PageTitle,
} from "../styled-components/styled-components";
import GolfIcon from "../components/GolfIcon";

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
