import React from "react";
import AddPlayer from "./AddPlayer";
import PlayerInfo from "./PlayerInfo";
import { useStateValue } from "../state/stateprovider";
import styled from "styled-components";

const PreGameSettings = () => {
  const [{ players }, dispatch] = useStateValue();

  return (
    <GameSettingsContainer>
      <AddPlayer />
      {players.map((p) => (
        <PlayerInfo name={p.name} hcp={p.hcp} />
      ))}
    </GameSettingsContainer>
  );
};

export default PreGameSettings;

const GameSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
