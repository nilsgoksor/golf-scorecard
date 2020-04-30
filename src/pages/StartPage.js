import React from "react";
import PreGameSettings from "../components/PreGameSettings";
import {
  TitleContainer,
  PageTitle,
  PageContainer,
} from "../styled-components/styled-components";
import GolfIcon from "../components/GolfIcon";

const StartPage = ({ history }) => {
  return (
    <PageContainer>
      <TitleContainer>
        <PageTitle>start</PageTitle>
        <GolfIcon />
      </TitleContainer>
      <PreGameSettings history={history} />
    </PageContainer>
  );
};

export default StartPage;
