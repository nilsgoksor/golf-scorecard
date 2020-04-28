import React, { useState, useEffect } from "react";
import { SET_HOLE } from "../state/actionTypes";
import { useStateValue } from "../state/stateprovider";
import {
  TitleContainer,
  PageTitle,
} from "../styled-components/styled-components";
import GolfIcon from "./GolfIcon";
import HoleSwitcher from "./HoleSwitcher";
import RoundData from "./RoundData";
import styled from "styled-components";
import HoleData from "./HoleData";

const HolePage = ({ history }) => {
  const [{ hole, course, players }, dispatch] = useStateValue();
  const [nextHole, setNextHole] = useState(hole);

  const changeHole = (input) => {
    if (input === "" || (parseInt(input) > 0 && parseInt(input) <= 9)) {
      setNextHole(input);
    }
  };

  useEffect(() => {
    if (
      parseInt(nextHole) > 0 &&
      parseInt(nextHole) <= 9 &&
      nextHole !== hole
    ) {
      dispatch({
        type: SET_HOLE,
        hole: parseInt(nextHole),
      });
    }
  }, [dispatch, hole, nextHole]);

  if (!players || players.length === 0) {
    history.push(`/`);
  }

  return (
    <HolePageContainer>
      <TitleContainer>
        <PageTitle>
          <HoleText
            value={nextHole}
            type="number"
            min="1"
            max="9"
            step="1"
            onChange={(e) => {
              changeHole(e.target.value);
            }}
          ></HoleText>
        </PageTitle>
        <GolfIcon />
      </TitleContainer>
      <HoleSwitcher
        hole={hole}
        holeData={course[hole - 1]}
        setPreviousHole={() => changeHole(hole - 1)}
        setNextHole={() => changeHole(hole + 1)}
      ></HoleSwitcher>
      <ContentContainer>
        <HoleData holeData={course[hole - 1]} players={players} hole={hole} />
        <RoundData history={history} />
      </ContentContainer>
    </HolePageContainer>
  );
};

export default HolePage;

const HoleText = styled.input`
  cursor: pointer;
  background: transparent;
  color: ${(p) => p.theme.color.white};
  border: none;
  font-size: 32px;
  font-weight: bold;
  margin-right: -25px;
  outline: 0;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const HolePageContainer = styled.div`
  width: 100%;
  height: 75%;
  margin: auto;

  @media (min-width: ${(p) => p.theme.width.default}) {
    width: ${(p) => p.theme.width.default};
  }
`;
