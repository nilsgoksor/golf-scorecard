import React from "react";
import AddPlayers from "./AddPlayers";
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
      <AddPlayers />
    </>
  );
};

export default StartPage;
