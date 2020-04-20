import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProvidePlayerDetails = ({ onPlayerAdded }) => {
  const [readyToAdd, setReadyToAdd] = useState(false);
  const [name, setName] = useState("");
  const [hcp, setHcp] = useState("");

  useEffect(() => {
    setReadyToAdd(name && hcp);
  }, [name, hcp]);

  const addPlayerhandler = () => {
    const player = { name, hcp };
    onPlayerAdded(player);
    setName("");
    setHcp("");
  };

  const isValidHandicap = (handicap) => {
    if (isNaN(parseInt(handicap)) || parseInt(handicap) < 0) {
      setHcp("");
    }
    if (handicap.length <= 3 && parseInt(handicap) <= 36) {
      setHcp(handicap);
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
      <PlayerInput
        placeholder="name"
        minLength="3"
        maxLength="20"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <PlayerInput
        placeholder="hcp"
        value={hcp}
        type="number"
        step="0.1"
        min="0"
        max="36"
        onChange={(e) => {
          isValidHandicap(e.target.value);
        }}
      />
      <Button disabled={!readyToAdd}>add player</Button>
    </PlayerDetailsForm>
  );
};
export default ProvidePlayerDetails;

const PlayerDetailsForm = styled.form``;

const PlayerInput = styled.input`
  background-color: transparent;
  padding: 5px;
  margin: 0px 5px;
  color: #fff;
  min-width: 50px;

  ::placeholder {
    color: #fff;
    opacity: 0.5;
  }
`;

const Button = styled.button`
  width: 100px;
  height: 25px;
  border-radius: 2px;
  padding: 5px;
  background-color: #fff;
  color: #000;

  :disabled {
    color: grey;
  }
  :hover {
    color: green;
  }
`;
