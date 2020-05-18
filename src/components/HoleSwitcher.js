import React, { useState, useEffect } from "react";
import { SET_HOLE } from "../state/actionTypes";
import { useContextState } from "../state/stateprovider";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import styled from "styled-components";
import {
  SmallText,
  MediumHeading,
} from "../styled-components/styled-components";

const HoleSwitcher = ({ holeData }) => {
  const { state, dispatch } = useContextState();
  const { hole } = state;

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

  return (
    <HoleSwitcherContainer>
      <ArrowContainer
        onClick={() => {
          changeHole(hole - 1);
        }}
        hide={hole === 1}
      >
        <ArrowBackIcon />
      </ArrowContainer>
      <HoleInfoContainer>
        <HoleNameContainer>
          <HoleText
            value={nextHole}
            type="number"
            min="1"
            max="9"
            step="1"
            onChange={(e) => {
              changeHole(e.target.value);
            }}
          />
          <MediumHeading>{holeData.name}</MediumHeading>
        </HoleNameContainer>
        <SmallText>{`par ${holeData.par} - ${holeData.length} m`}</SmallText>
      </HoleInfoContainer>
      <ArrowContainer
        onClick={() => {
          changeHole(hole + 1);
        }}
        hide={hole === 9}
      >
        <ArrowForwardIcon />
      </ArrowContainer>
    </HoleSwitcherContainer>
  );
};

export default HoleSwitcher;

const HoleSwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HoleInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  width: ${(p) => p.theme.width.small};
`;

const HoleNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${(p) => p.theme.width.small};
`;

const ArrowContainer = styled.div`
  cursor: pointer;
  visibility: visible;
  visibility: ${(p) => p.hide && "hidden"};
  border: 0.16em solid ${(p) => p.theme.color.white};
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  color: ${(p) => p.theme.color.white};
  padding: 10px;
  border-radius: 50%;
`;

const HoleText = styled.input`
  cursor: pointer;
  background: transparent;
  color: ${(p) => p.theme.color.white};
  border: none;
  font-size: 32px;
  font-weight: bold;
  outline: 0;
`;
