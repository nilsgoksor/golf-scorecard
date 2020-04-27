import React, { useEffect, useState } from "react";
import {
  TitleContainer,
  PageTitle,
  ConfirmButton,
  PlayerContainer,
  PlayerHcpText,
  PlayerNameText,
} from "../styled-components/styled-components";
import GolfIcon from "./GolfIcon";
import { useStateValue } from "../state/stateprovider";
import { RESET_ROUND_DATA } from "../state/actionTypes";
import styled from "styled-components";
import PlayerSummary from "./PlayerSummary";

const RoundCompletedPage = ({ history }) => {
  const [{ players }, dispatch] = useStateValue();
  const [table, setTable] = useState(null);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    let winnerScore = 0;
    let winners = [];
    const table = players.map((p) => {
      let totalScore = 0;
      p.roundData.map((r) => {
        totalScore = totalScore + r.data.score;
      });
      console.log("p.name", p.name);
      if (totalScore > winnerScore) {
        winnerScore = totalScore;
        winners.push(p.name);
      }
      return { name: p.name, totalScore };
    });
    setTable(table);
    setWinners(winners);
  }, [players]);

  console.log("winners", winners);
  console.log(winners.includes("adda"));

  return (
    <RoundCompletedPageContainer>
      <TitleContainer>
        <PageTitle>round completed</PageTitle>
        <GolfIcon />
      </TitleContainer>
      <WinnerSummaryContainer>
        {table &&
          table.map((pos) => {
            return (
              <PlayerSummaryContainer golden={winners.includes(pos.name)}>
                <PlayerNameText>{`${pos.totalScore} p`}</PlayerNameText>
                <PlayerNameText>{pos.name}</PlayerNameText>
              </PlayerSummaryContainer>
            );
          })}
        <SummaryContainer>
          <PlayerSummary />
        </SummaryContainer>
      </WinnerSummaryContainer>
      <ConfirmButton
        onClick={() => {
          history.push(`/`);
          dispatch({
            type: RESET_ROUND_DATA,
          });
        }}
      >
        new round
      </ConfirmButton>
    </RoundCompletedPageContainer>
  );
};

export default RoundCompletedPage;

const PlayerSummaryContainer = styled(PlayerContainer)`
  display: flex;
  justify-content: center;
  background-color: ${(p) => p.golden && "#FBEC49"};
`;

const RoundCompletedPageContainer = styled.div`
  @media (min-width: ${(p) => p.theme.width.default}) {
    margin: auto;
    width: ${(p) => p.theme.width.default};
  }
`;

const WinnerSummaryContainer = styled.div`
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

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid white;
  margin: 15px;
  padding: 5px ${(p) => p.theme.padding.default};
`;
