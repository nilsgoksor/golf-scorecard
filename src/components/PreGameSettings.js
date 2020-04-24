import React from "react";
import AddPlayer from "./AddPlayer";
import PlayerInfo from "./PlayerInfo";
import { useStateValue } from "../state/stateprovider";
import styled from "styled-components";
import { SET_HOLE } from "../state/actionTypes";
import {
  ConfirmButton,
  SmallHeading,
} from "../styled-components/styled-components";

const PreGameSettings = ({ history }) => {
  const [{ players }, dispatch] = useStateValue();

  return (
    <GameSettingsContainer>
      <AddPlayer />
      {players.length > 0 && (
        <>
          <SmallHeading>{players.length}-ball with</SmallHeading>
          <PlayersContainer>
            {players.map((p) => (
              <PlayerInfo key={p.name} player={p} />
            ))}
          </PlayersContainer>
          <ConfirmButton
            disabled={players.length <= 0}
            onClick={() => {
              dispatch({
                type: SET_HOLE,
                hole: 1,
              });
              history.push(`/hole`);
            }}
          >
            start
          </ConfirmButton>
        </>
      )}
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

const PlayersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${(p) => p.theme.margin.large};

  @media (min-width: ${(p) => p.theme.width.default}) {
    flex-direction: row;
    width: ${(p) => p.theme.width.default};
  }
`;
