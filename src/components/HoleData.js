import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PlayerContainer,
  PlayerNameText,
  PlayerHcpText,
} from "../styled-components/styled-components";
import SetPlayerStrokes from "./SetPlayerStrokes";

const HoleData = ({ players, holeData, hole }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [hole]);

  const handleMouseClick = (event, name) => {
    if (name) {
      setSelected(name);
    } else {
      const target = event.target;
      if (selected) {
        if (target.id !== "player-container") {
          return;
        }
        setSelected(null);
      }
    }
  };

  return (
    <PlayersContainer
      id="player-container"
      onClick={(e) => {
        handleMouseClick(e);
      }}
    >
      {players.map((player) => (
        <EditPlayerStatsContainer
          key={player.name}
          selected={player.name === selected}
          onClick={(e) => {
            handleMouseClick(e, player.name);
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
    border: ${(p) => !p.selected && "3px soid yellow"};
  }
  width: ${(p) => p.selected && "175px"};
  height: ${(p) => p.selected && "175px"};
  padding: ${(p) => p.selected && "20px"};
  transition: all 0.3s;
`;

const PlayersContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
