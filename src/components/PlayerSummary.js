import React, { useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../state/stateprovider";
import { STROKES, POINTS, BEER } from "../constans/summary-constants";

const PlayerSummary = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ players, course }, dispatch] = useStateValue();

  const [type, setType] = useState(POINTS);

  const getPointsSummary = () => {
    return (
      <>
        {players.map((player) => {
          let totalScore = 0;
          return (
            <PlayerSummaryContainer key={player.name}>
              <NameContainer>{`${player.name}`}</NameContainer>
              {player.roundData.map((holeData) => {
                totalScore += holeData.data.score;
                return (
                  <ScoreContainer key={`${player.name}-${holeData.hole}`}>
                    {holeData.data.score ? holeData.data.score : "-"}
                  </ScoreContainer>
                );
              })}
              <TotalScoreContainer>{`${totalScore}`}</TotalScoreContainer>
            </PlayerSummaryContainer>
          );
        })}
      </>
    );
  };

  const getStrokesSummary = () => {
    return (
      <>
        {players.map((player) => {
          let totalStrokes = 0;
          return (
            <PlayerSummaryContainer key={player.name}>
              <NameContainer>{`${player.name}`}</NameContainer>
              {player.roundData.map((holeData) => {
                totalStrokes += holeData.data.strokes;
                return (
                  <ScoreContainer key={`${player.name}-${holeData.hole}`}>
                    {holeData.data.strokes ? holeData.data.strokes : "-"}
                  </ScoreContainer>
                );
              })}
              <TotalScoreContainer>{`${totalStrokes}`}</TotalScoreContainer>
            </PlayerSummaryContainer>
          );
        })}
      </>
    );
  };

  const getBeerSummary = () => {
    return (
      <>
        {players.map((player) => {
          let totalBeerPoints = 0;
          return (
            <PlayerSummaryContainer key={player.name}>
              <NameContainer>{`${player.name}`}</NameContainer>
              {player.roundData.map((holeData) => {
                let compareScore = 1;
                players.map((p) => {
                  if (p.name !== player.name) {
                    if (
                      p.roundData[holeData.hole - 1].data.score > compareScore
                    )
                      compareScore = p.roundData[holeData.hole - 1].data.score;
                  }
                  return null;
                });
                let beerPoints = 0;
                if (holeData.data.score > compareScore) {
                  beerPoints = 2;
                } else if (holeData.data.score === compareScore) {
                  beerPoints = 1;
                }
                totalBeerPoints += beerPoints;

                return (
                  <ScoreContainer key={`${player.name}-${holeData.hole}`}>
                    {beerPoints > 0 ? beerPoints : "-"}
                  </ScoreContainer>
                );
              })}
              <TotalScoreContainer>{`${totalBeerPoints}`}</TotalScoreContainer>
            </PlayerSummaryContainer>
          );
        })}
      </>
    );
  };
  return (
    <>
      <SummaryContainer>
        <PlayerSummaryContainer header={true}>
          <NameContainer>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value={POINTS}>{POINTS}</option>
              <option value={STROKES}>{STROKES}</option>
              <option value={BEER}>{BEER}</option>
            </select>
          </NameContainer>
          {course.map((holeData) => {
            return (
              <ScoreContainer key={holeData.hole} header={true}>
                {holeData.hole}
              </ScoreContainer>
            );
          })}
          <TotalScoreContainer>{`${type}`}</TotalScoreContainer>
        </PlayerSummaryContainer>
        {type === POINTS && getPointsSummary()}
        {type === STROKES && getStrokesSummary()}
        {type === BEER && getBeerSummary()}
      </SummaryContainer>
    </>
  );
};

export default PlayerSummary;

const PlayerSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  border-bottom: ${(p) => p.header && `0.3px solid ${p.theme.color.white}`};
  padding: 2px 0px;
`;

const NameContainer = styled.div`
  text-align: left;
  word-wrap: break-word;
  width: 75px;
  max-width: 75px;
`;

const TotalScoreContainer = styled.div`
  text-align: center;
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
  background-color: ${(p) => !p.header && p.theme.color.white};
  color: ${(p) => (!p.header ? p.theme.color.black : p.theme.color.white)};
  margin: 3px;
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid white;
  margin: 15px;
  padding: 5px ${(p) => p.theme.padding.default};
`;
