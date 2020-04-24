import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import styled from "styled-components";
import {
  SmallText,
  MediumHeading,
} from "../styled-components/styled-components";

const HoleSwitcher = ({ hole, holeData, setPreviousHole, setNextHole }) => (
  <HoleSwitcherContainer>
    <ArrowContainer
      onClick={() => {
        setPreviousHole();
      }}
      hide={hole === 1}
    >
      <ArrowBackIcon />
    </ArrowContainer>
    <HoleNameContainer>
      <MediumHeading>{holeData.name}</MediumHeading>
      <SmallText>{`par ${holeData.par} - ${holeData.length} m`}</SmallText>
    </HoleNameContainer>
    <ArrowContainer
      onClick={() => {
        setNextHole();
      }}
      hide={hole === 9}
    >
      <ArrowForwardIcon />
    </ArrowContainer>
  </HoleSwitcherContainer>
);

export default HoleSwitcher;

const HoleSwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HoleNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: ${(p) => p.theme.width.small};
`;

const ArrowContainer = styled.div`
  cursor: pointer;
  visibility: visible;
  visibility: ${(p) => p.hide && "hidden"};
`;
