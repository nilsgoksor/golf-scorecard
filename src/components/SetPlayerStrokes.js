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

const ONE = [1, "1", "one", "what", "Wang"];
const TWO = [2, "2", "two", "to", "too"];
const THREE = [3, "3", "three", "tree", "free"];
const FOUR = [4, "4", "four", "for"];
const FIVE = [5, "5", "five", "find", "sorry"];
const SIX = [6, "6", "six"];
const SEVEN = [7, "7", "seven", "send", "send a", "set a"];
const EIGHT = [8, "8", "eight", "AIDS", "hey"];
const NINE = [9, "9", "nine", "not", "mine"];

const SetPlayerStrokes = ({ player, holeData }) => {
  // eslint-disable-next-line no-unused-vars
  const [{ players }, dispatch] = useStateValue();

  const [result, setResult] = useState();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => setResult(result),
  });

  const setListening = (listenStatus) => {
    const isChrome = !!window.chrome;
    if (!isChrome) {
      return;
    }
    if (!listenStatus) {
      listen();
    } else {
      stop();
    }
  };

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const [readyToSpeak, setReadyToSpeak] = useState(false);
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    if (readyToSpeak) {
      speakNewResult(newStrokes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToSpeak]);

  const speakNewResult = (result) => {
    speak({ text: result || "none" });
    if (result === 1) {
      speak({ text: "hole in one!" });
      speak({ text: `congratulations, ${player.name}` });
    } else if (result === holeData.par - 3) {
      speak({ text: "albatros!" });
      speak({ text: `brilliant, ${player.name}` });
    } else if (result === holeData.par - 2) {
      speak({ text: "eagle!" });
      speak({ text: `splendid, ${player.name}` });
    } else if (result === holeData.par - 1) {
      speak({ text: "birdie!" });
      speak({ text: `well done, ${player.name}` });
    } else if (result === holeData.par) {
      speak({ text: "par!" });
    } else if (result > holeData.par + 3) {
      speak({ text: `you suck, ${player.name}` });
    }
  };

  const strokeInputHandler = (input) => {
    if (isNaN(input) || input === "") {
      stop();
      setNewStrokes(null);
    }
    if (parseInt(input) >= 0 && parseInt(input) <= 9 && input.length === 1) {
      stop();
      setNewStrokes(parseInt(input));
    }
  };

  useEffect(() => {
    setReadyToSpeak(false);
    setTimeout(() => {
      setReadyToSpeak(true);
    }, 2000);

    dispatch({
      type: SET_PLAYER_STROKES,
      strokes: newStrokes,
      holeData: holeData,
      player: player,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newStrokes]);

  return (
    <SetPlayerStrokesContainer>
      <PlayerNameText>{player.name}</PlayerNameText>
      <PlayerHcpText>{`how many strokes?`}</PlayerHcpText>
      <InputContainer>
        <>
          <VoiceEditor
            onClick={() => setListening(listening)}
            listening={listening}
          >
            <MicIcon style={{ fontSize: 40 }} />
          </VoiceEditor>
          <ScoreText
            value={newStrokes || ""}
            type="number"
            pattern="\d*"
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
  color: ${(p) => p.theme.color.green};
  outline: 0;
  font-size: 52px;
  font-weight: bold;
  padding: 0;
  border: 0.3px solid ${(p) => p.theme.color.green};
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
  padding: 15px;

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
  margin-top: 5px;
`;
