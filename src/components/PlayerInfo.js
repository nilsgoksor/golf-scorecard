import React, { useState } from "react";
import styled from "styled-components";
import { REMOVE_PLAYER } from "../state/actionTypes";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStateValue } from "../state/stateprovider";
import {
  PlayerContainer,
  PlayerNameText,
  PlayerHcpText,
} from "../styled-components/styled-components";

const PlayerInfo = ({ player }) => {
  const [{ players }, dispatch] = useStateValue();
  const [hover, setHover] = useState(false);

  return (
    <PlayerAddedContainer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        dispatch({
          type: REMOVE_PLAYER,
          player,
        });
      }}
    >
      {!hover ? (
        <>
          <PlayerHcpText>{player.hcp}</PlayerHcpText>
          <PlayerNameText>{player.name}</PlayerNameText>
        </>
      ) : (
        <DeleteIcon />
      )}
    </PlayerAddedContainer>
  );
};

export default PlayerInfo;

const PlayerAddedContainer = styled(PlayerContainer)`
  &:hover {
    background-color: orange;
    cursor: pointer;
  }
`;
