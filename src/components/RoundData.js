import React from "react";
import styled from "styled-components";
import { ConfirmButton } from "../styled-components/styled-components";
import PlayerSummary from "./PlayerSummary";

const RoundData = ({ history }) => {
  return (
    <RoundDataContainer>
      <SummaryContainer>
        <PlayerSummary />
      </SummaryContainer>
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
  margin: ${(p) => p.theme.margin.default};
  padding: 0px ${(p) => p.theme.padding.default};
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid white;
  margin: 15px;
  padding: 5px ${(p) => p.theme.padding.default};
`;
