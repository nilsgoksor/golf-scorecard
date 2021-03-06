import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ADD_PLAYER } from "../state/actionTypes";
import { useContextState } from "../state/stateprovider";
import {
  ConfirmButton,
  UserInput,
  InputContainer,
  LinkText,
} from "../styled-components/styled-components";

const AddPlayer = () => {
  const { state, dispatch } = useContextState();
  const { players } = state;
  const [readyToAdd, setReadyToAdd] = useState(false);
  const [nameExistError, setNameExistError] = useState(false);
  const [name, setName] = useState("");
  const [hcp, setHcp] = useState("");

  useEffect(() => {
    const nameExist =
      players && players.findIndex((p) => p.name === name) !== -1;
    setNameExistError(nameExist);
    setReadyToAdd(name && hcp && !nameExist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } else if (handicap.length <= 2 && parseInt(handicap) <= 99) {
      setHcp(handicap / 10);
    } else if (handicap.length <= 3 && parseInt(handicap) >= 100) {
      setHcp(handicap / 10);
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
        <NameExistError>
          {nameExistError && "name already added"}
        </NameExistError>
      </InputContainer>
      <InputContainer>
        <UserInput
          placeholder="hcp"
          value={hcp}
          type="number"
          pattern="/^[0-9.,]+$/"
          step="0.1"
          inputMode="decimal"
          onChange={(e) => {
            isValidHandicap(e.target.value);
          }}
        />
        <HandicapLink href="https://mingolf.golf.se/Site/HCP" target="_blank">
          Forgot your hcp?
        </HandicapLink>
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

const HandicapLink = styled(LinkText)`
  @media (min-width: ${(p) => p.theme.width.default}) {
    margin: 0px;
  }
`;
const NameExistError = styled.p`
  color: ${(p) => p.theme.color.white};
  text-decoration: none;
  font-size: 11px;
  margin: ${(p) => p.theme.margin.double};
  @media (min-width: ${(p) => p.theme.width.default}) {
    margin: 0px;
  }
`;
