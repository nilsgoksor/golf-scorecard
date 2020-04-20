import React from "react";
import styled from "styled-components";

const PlayerInfo = ({ name, hcp }) => {
  return (
    <PlayerInfoContainer>
      <p>{name}</p>
      <p>{hcp}</p>
    </PlayerInfoContainer>
  );
};

export default PlayerInfo;

const PlayerInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
`;
