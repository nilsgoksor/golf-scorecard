import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ADD_PLAYER } from "../state/actionTypes";
import { useStateValue } from "../state/stateprovider";
import {
  ConfirmButton,
  UserInput,
  InputContainer,
} from "../styled-components/styled-components";

const AddPlayer = () => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue();

  const [readyToAdd, setReadyToAdd] = useState(false);
  const [name, setName] = useState("");
  const [hcp, setHcp] = useState("");

  useEffect(() => {
    setReadyToAdd(name && hcp);
  }, [name, hcp]);

  const addPlayerhandler = () => {
    dispatch({
      type: ADD_PLAYER,
      player: { name, hcp },
    });
    setName("");
    setHcp("");
    document.getElementById("name").focus();
  };

  const isValidHandicap = (handicap) => {
    handicap = handicap.replace(",", ".");
    if (isNaN(parseInt(handicap)) || parseInt(handicap) < 0) {
      setHcp("");
    }
    if (handicap.length <= 3 && parseInt(handicap) <= 36) {
      setHcp(handicap);
    } else if (handicap.length <= 3 && parseInt(handicap) >= 100) {
      setHcp(handicap / 10);
    } else if (handicap.length === 4 && handicap.includes(".")) {
      setHcp(handicap);
    }
  };

  return (
    <PlayerDetailsForm
      onSubmit={(e) => {
        e.preventDefault();
        addPlayerhandler();
      }}
    >
      <InputContainer>
        <UserInput
          id="name"
          placeholder="name"
          minLength="3"
          maxLength="20"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </InputContainer>
      <InputContainer>
        <UserInput
          placeholder="hcp"
          value={hcp}
          // type="number"
          min="0"
          max="36"
          step="0.1"
          onChange={(e) => {
            isValidHandicap(e.target.value);
          }}
        />
        <LinkText href="https://mingolf.golf.se/" target="_blank">
          Forgot your hcp?
        </LinkText>
      </InputContainer>
      <InputContainer>
        <ConfirmButton disabled={!readyToAdd}>add player</ConfirmButton>
      </InputContainer>
    </PlayerDetailsForm>
  );
};
export default AddPlayer;

const PlayerDetailsForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${(p) => p.theme.width.default}) {
    flex-direction: row;
  }
`;

const LinkText = styled.a`
  color: ${(p) => p.theme.color.white};
  text-decoration: none;
  font-size: 11px;
`;
