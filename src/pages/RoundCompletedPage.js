import React, { useEffect, useState } from "react";
import {
  TitleContainer,
  PageTitle,
  ConfirmButton,
  PlayerContainer,
  PlayerNameText,
  LinkText,
  PageContainer,
} from "../styled-components/styled-components";
import GolfIcon from "../components/GolfIcon";
import { useStateValue } from "../state/stateprovider";
import { RESET_ROUND_DATA } from "../state/actionTypes";
import styled from "styled-components";
import PlayerSummary from "../components/PlayerSummary";

const RoundCompletedPage = ({ history }) => {
  const [{ players }, dispatch] = useStateValue();
  const [table, setTable] = useState(null);
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    let winnerScore = 0;
    let winners = [];
    const table = players.map((p) => {
      let totalScore = 0;
      p.roundData.map((r) => (totalScore = totalScore + r.data.score));
      if (totalScore === winnerScore) {
        winnerScore = totalScore;
        winners.push(p.name);
      } else if (totalScore > winnerScore) {
        winners = [p.name];
        winnerScore = totalScore;
      }
      return { name: p.name, totalScore };
    });
    setTable(table);
    setWinners(winners);
  }, [players]);

  return (
    <PageContainer>
      <TitleContainer>
        <PageTitle>round completed</PageTitle>
        <GolfIcon />
      </TitleContainer>
      <ContentContainer>
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
        </WinnerSummaryContainer>
        <PlayerSummary />
        <ActionContainer>
          <LinkText
            href="https://mingolf.golf.se/Site/HCP/Adjustment"
            target="_blank"
          >
            Click here to register your round
          </LinkText>
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
        </ActionContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default RoundCompletedPage;

const PlayerSummaryContainer = styled(PlayerContainer)`
  display: flex;
  justify-content: center;
  background-color: ${(p) => p.golden && "#FBEC49"};
  margin-bottom: ${(p) => p.theme.margin.large};
`;
const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
