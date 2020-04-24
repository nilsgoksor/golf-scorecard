import React from "react";
import styled from "styled-components";
import { ConfirmButton } from "../styled-components/styled-components";

const FinishRound = () => {
  return (
    <FinishRoundContainer>
      <ConfirmButton>Finish round</ConfirmButton>
      <ConfirmButton>Finish round</ConfirmButton>
    </FinishRoundContainer>
  );
};

export default FinishRound;

const FinishRoundContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: ${(p) => p.theme.margin.default};
  padding: 0px ${(p) => p.theme.padding.default};
`;
