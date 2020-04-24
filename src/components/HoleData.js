import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PlayerContainer,
  PlayerNameText,
  PlayerHcpText,
} from "../styled-components/styled-components";
import SetPlayerStrokes from "./SetPlayerStrokes";

const HoleData = ({ players, holeData, hole }) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected("");
  }, [hole]);

  return (
    <PlayersContainer>
      {players.map((player) => (
        <EditPlayerStatsContainer
          key={player.name}
          selected={player.name === selected}
          onClick={() => {
            setSelected(player.name);
          }}
        >
          {player.name !== selected ? (
            <>
              <PlayerHcpText>{player.hcp}</PlayerHcpText>
              <PlayerNameText>{player.name}</PlayerNameText>
            </>
          ) : (
            <SetPlayerStrokes player={player} holeData={holeData} />
          )}
        </EditPlayerStatsContainer>
      ))}
    </PlayersContainer>
  );
};

export default HoleData;

const EditPlayerStatsContainer = styled(PlayerContainer)`
  &:hover {
    cursor: ${(p) => !p.selected && "pointer"};
    border: ${(p) => !p.selected && "3px solid yellow"};
  }
  width: ${(p) => p.selected && "200px"};
  height: ${(p) => p.selected && "200px"};
  transition: all 1s;
`;

const PlayersContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
