import React, { useState } from "react";
import styled from "styled-components";
import { REMOVE_PLAYER } from "../state/actionTypes";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStateValue } from "../state/stateprovider";

const PlayerInfo = ({ player }) => {
  const [{ players }, dispatch] = useStateValue();
  const [hover, setHover] = useState(false);

  return (
    <PlayerInfoContainer
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
          <HcpText>{player.hcp}</HcpText>
          <NameText>{player.name}</NameText>
        </>
      ) : (
        <DeleteIcon></DeleteIcon>
      )}
    </PlayerInfoContainer>
  );
};

export default PlayerInfo;

const PlayerInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  width: 75px;
  height: 75px;
  padding: 3px;
  text-align: center;
  border-radius: 50%;
  background-color: ${(p) => p.theme.color.white};
  box-shadow: -3px 3px 15px rgba(0, 0, 0, 0.35),
    0px 0px 100px rgba(0, 0, 0, 0.25), 0px 0px 5px rgba(255, 255, 255, 0.5);

  &:hover {
    background-color: orange;
    cursor: pointer;
  }
`;

const HcpText = styled.p`
  color: ${(p) => p.theme.color.black};
  margin: 0px;
`;
const NameText = styled.p`
  color: ${(p) => p.theme.color.green};
  margin: 0px;
  width: 75px;
  overflow-wrap: break-word;
`;
