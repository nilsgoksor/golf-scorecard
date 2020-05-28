import React, { useState } from "react";
import styled from "styled-components";
import { useContextState } from "../state/stateprovider";
import { STROKES, POINTS, MATCH } from "../constans/summary-constants";
import { ConfirmButton } from "../styled-components/styled-components";
import EqualizerIcon from "@material-ui/icons/Equalizer";

const PlayerSummary = () => {
  const { state } = useContextState();
  const { players, course } = state;

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

  const getMatchSummary = () => {
    return (
      <>
        {players.map((player) => {
          let totalMatchPoints = 0;
          return (
            <PlayerSummaryContainer key={player.name}>
              <NameContainer>{`${player.name}`}</NameContainer>
              {player.roundData.map((holeData) => {
                let compareScore = 0;
                players.map((p) => {
                  if (
                    p.name !== player.name &&
                    p.roundData[holeData.hole - 1].data.score > compareScore
                  ) {
                    compareScore = p.roundData[holeData.hole - 1].data.score;
                  }
                  return compareScore;
                });
                let matchPoints = 0;
                if (holeData.data.score > compareScore) {
                  matchPoints = 2;
                } else if (
                  holeData.data.score === compareScore &&
                  holeData.data.score > 0
                ) {
                  matchPoints = 1;
                }
                totalMatchPoints += matchPoints;
                return (
                  <ScoreContainer key={`${player.name}-${holeData.hole}`}>
                    {matchPoints > 0 ? matchPoints : "-"}
                  </ScoreContainer>
                );
              })}
              <TotalScoreContainer>{`${totalMatchPoints}`}</TotalScoreContainer>
            </PlayerSummaryContainer>
          );
        })}
      </>
    );
  };
  return (
    <SummaryContainer>
      <PlayerSummaryContainer>
        <SelectContainer>
          <ConfirmButton
            onClick={() => {
              setType(STROKES);
            }}
            selected={type === STROKES}
          >
            {STROKES}
          </ConfirmButton>
          <ConfirmButton
            onClick={() => {
              setType(POINTS);
            }}
            selected={type === POINTS}
          >
            {POINTS}
          </ConfirmButton>
          <ConfirmButton
            onClick={() => {
              setType(MATCH);
            }}
            selected={type === MATCH}
          >
            {MATCH}
          </ConfirmButton>
        </SelectContainer>
      </PlayerSummaryContainer>
      <PlayerSummaryContainer header={true}>
        <NameContainer>name</NameContainer>
        {course.map((holeData) => {
          return (
            <ScoreContainer key={holeData.hole} header={true}>
              {holeData.hole}
            </ScoreContainer>
          );
        })}
        <TotalScoreContainer>
          <EqualizerIcon></EqualizerIcon>
        </TotalScoreContainer>
      </PlayerSummaryContainer>
      {type === POINTS && getPointsSummary()}
      {type === STROKES && getStrokesSummary()}
      {type === MATCH && getMatchSummary()}
    </SummaryContainer>
  );
};

export default PlayerSummary;

const PlayerSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: ${(p) => p.header && `2px solid ${p.theme.color.white}`};
  margin-bottom: ${(p) => p.header && `15px`};
  padding: 2px 2px;
`;

const NameContainer = styled.div`
  text-align: left;
  word-wrap: break-word;
  width: 75px;
  max-width: 75px;
`;

const TotalScoreContainer = styled.div`
  text-align: center;
  width: 25px;
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
  border: ${(p) => `2px solid ${p.theme.color.white}`};
  padding: ${(p) => p.theme.padding.default};
`;

const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;
