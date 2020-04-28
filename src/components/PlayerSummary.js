import React from "react";
import styled from "styled-components";
import { useStateValue } from "../state/stateprovider";

const PlayerSummary = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ players }, dispatch] = useStateValue();

  return players.map((player) => {
    let totalScore = 0;
    return (
      <PlayerSummaryContainer key={player.name}>
        <NameContainer>{`${player.name}`}</NameContainer>
        {player.roundData.map((holeData) => {
          totalScore += holeData.data.score;
          return (
            <ScoreContainer key={`${player.name}-${holeData.hole}`}>
              {holeData.data.strokes ? holeData.data.score : "-"}
            </ScoreContainer>
          );
        })}
        <TotalScoreContainer>{`${totalScore} p`}</TotalScoreContainer>
      </PlayerSummaryContainer>
    );
  });
};

export default PlayerSummary;

const PlayerSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const NameContainer = styled.div`
  text-align: left;
  word-wrap: break-word;

  width: 50px;
  max-width: 50px;
`;

const TotalScoreContainer = styled.div`
  text-align: right;
  width: 40px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  padding: 3px;
  text-align: center;
  border-radius: 50%;
  background-color: ${(p) => p.theme.color.white};
  color: ${(p) => p.theme.color.black};
  margin: 3px;
`;
