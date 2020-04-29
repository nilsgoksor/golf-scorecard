import React from "react";
import styled from "styled-components";
import { ConfirmButton } from "../styled-components/styled-components";
import PlayerSummary from "./PlayerSummary";

const RoundData = ({ history }) => {
  return (
    <RoundDataContainer>
      <PlayerSummary />
      <ButtonContainer>
        <ConfirmButton
          onClick={() => {
            history.push(`/`);
          }}
        >
          settings
        </ConfirmButton>
        <ConfirmButton
          onClick={() => {
            history.push(`/round-completed`);
          }}
        >
          finish round
        </ConfirmButton>
      </ButtonContainer>
    </RoundDataContainer>
  );
};

export default RoundData;

const RoundDataContainer = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
