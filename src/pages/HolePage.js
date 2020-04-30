import React from "react";
import { useStateValue } from "../state/stateprovider";
import HoleSwitcher from "../components/HoleSwitcher";
import RoundData from "../components/RoundData";
import styled from "styled-components";
import HoleData from "../components/HoleData";
import { PageContainer } from "../styled-components/styled-components";

const HolePage = ({ history }) => {
  // eslint-disable-next-line no-unused-vars
  const [{ hole, course, players }, dispatch] = useStateValue();

  if (!players || players.length === 0) {
    history.push(`/`);
  }

  return (
    <PageContainer>
      <HoleSwitcher holeData={course[hole - 1]}></HoleSwitcher>
      <ContentContainer>
        <HoleData holeData={course[hole - 1]} players={players} hole={hole} />
        <RoundData history={history} />
      </ContentContainer>
    </PageContainer>
  );
};

export default HolePage;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
