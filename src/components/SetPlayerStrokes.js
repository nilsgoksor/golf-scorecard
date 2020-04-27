import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PlayerNameText,
  PlayerHcpText,
} from "../styled-components/styled-components";
import { useStateValue } from "../state/stateprovider";
import { SET_PLAYER_STROKES } from "../state/actionTypes";
import MicIcon from "@material-ui/icons/Mic";
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";
import {
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
} from "../constants/Voiceinput";

const SetPlayerStrokes = ({ player, holeData }) => {
  // eslint-disable-next-line no-unused-vars
  const [{ players }, dispatch] = useStateValue();

  const [result, setResult] = useState();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => setResult(result),
  });

  const { speak } = useSpeechSynthesis();

  const [newStrokes, setNewStrokes] = useState(null);

  useEffect(() => {
    const roundData = player.roundData.find(
      (round) => round.hole === holeData.hole
    );
    if (roundData) {
      setNewStrokes(roundData.data.strokes);
    }
  }, [holeData, player.roundData]);

  useEffect(() => {
    let validInput = null;
    if (ONE.includes(result)) {
      validInput = 1;
    } else if (TWO.includes(result)) {
      validInput = 2;
    } else if (THREE.includes(result)) {
      validInput = 3;
    } else if (FOUR.includes(result)) {
      validInput = 4;
    } else if (FIVE.includes(result)) {
      validInput = 5;
    } else if (SIX.includes(result)) {
      validInput = 6;
    } else if (SEVEN.includes(result)) {
      validInput = 7;
    } else if (EIGHT.includes(result)) {
      validInput = 8;
    } else if (NINE.includes(result)) {
      validInput = 9;
    }
    if (validInput) {
      stop();
      setNewStrokes(validInput);
      speak({ text: validInput });
      if (validInput === 1) {
        speak({ text: "hole in one!" });
        speak({ text: `congratulations, ${player.name}` });
      } else if (validInput === holeData.par - 3) {
        speak({ text: "albatros!" });
        speak({ text: `brilliant, ${player.name}` });
      } else if (validInput === holeData.par - 2) {
        speak({ text: "eagle!" });
        speak({ text: `splendid, ${player.name}` });
      } else if (validInput === holeData.par - 1) {
        speak({ text: "birdie!" });
        speak({ text: `well done, ${player.name}` });
      } else if (validInput === holeData.par) {
        speak({ text: "par!" });
      } else if (validInput > holeData.par + 3) {
        speak({ text: `you suck, ${player.name}` });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const strokeInputHandler = (input) => {
    if (
      input === "" ||
      (parseInt(input) >= 0 && parseInt(input) <= 9 && input.length === 1)
    ) {
      setNewStrokes(parseInt(input));
      stop();
    }
  };

  useEffect(() => {
    if (newStrokes) {
      dispatch({
        type: SET_PLAYER_STROKES,
        strokes: parseInt(newStrokes),
        holeData: holeData,
        player: player,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newStrokes]);

  return (
    <SetPlayerStrokesContainer>
      <PlayerNameText>{player.name}</PlayerNameText>
      <PlayerHcpText>{`how many strokes?`}</PlayerHcpText>
      <InputContainer>
        <>
          <VoiceEditor
            onClick={() => {
              if (listening) {
                stop();
              } else {
                listen();
              }
            }}
            listening={listening}
          >
            <MicIcon style={{ fontSize: 40 }} />
          </VoiceEditor>
          <ScoreText
            value={newStrokes || ""}
            type="number"
            min="1"
            max="9"
            step="1"
            onChange={(e) => {
              strokeInputHandler(e.target.value);
            }}
          />
        </>
      </InputContainer>
    </SetPlayerStrokesContainer>
  );
};
export default SetPlayerStrokes;

const ScoreText = styled.input`
  cursor: pointer;
  background: transparent;
  color: ${(p) => p.theme.color.green};
  border: none;
  outline: 0;
  font-size: 32px;
  font-weight: bold;
  border-bottom: 3px solid ${(p) => p.theme.color.green};
  margin: 5px;
  margin-bottom: 5px;
  padding: 0;
`;

const VoiceEditor = styled.div`
  color: ${(p) => p.theme.color.white};
  background-color: ${(p) => p.theme.color.green};
  cursor: pointer;
  border-radius: 50%;
  border: ${(p) =>
    p.listening ? `3px solid ${p.theme.color.green}` : `3px solid transparent`};
  animation: ${(p) => p.listening && `border-pulsate 1s infinite`};
  box-sizing: padding-box;
  margin: 5px;
  padding: 10px;
  @keyframes border-pulsate {
    0% {
      background-color: ${(p) => p.theme.color.green};
    }
    50% {
      background-color: rgba(0, 255, 255, 0);
      color: ${(p) => p.theme.color.green};
    }
    100% {
      background-color: ${(p) => p.theme.color.green};
    }
  }
`;

const SetPlayerStrokesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: space-between;
  margin: 5px;
`;
