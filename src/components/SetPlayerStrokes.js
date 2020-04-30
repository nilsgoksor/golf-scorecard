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
import * as voiceInputs from "../constans/voice-inputs";

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
    if (voiceInputs.ONE.includes(result)) {
      validInput = 1;
    } else if (voiceInputs.TWO.includes(result)) {
      validInput = 2;
    } else if (voiceInputs.THREE.includes(result)) {
      validInput = 3;
    } else if (voiceInputs.FOUR.includes(result)) {
      validInput = 4;
    } else if (voiceInputs.FIVE.includes(result)) {
      validInput = 5;
    } else if (voiceInputs.SIX.includes(result)) {
      validInput = 6;
    } else if (voiceInputs.SEVEN.includes(result)) {
      validInput = 7;
    } else if (voiceInputs.EIGHT.includes(result)) {
      validInput = 8;
    } else if (voiceInputs.NINE.includes(result)) {
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
    if (parseInt(input) >= 0 && parseInt(input) <= 19 && input.length <= 2) {
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
            max="19"
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
  font-size: 42px;
  border: 0.3px solid ${(p) => p.theme.color.green};
  -moz-box-sizing: content-box;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  padding-left: 10px;
`;

const VoiceEditor = styled.div`
  color: ${(p) => p.theme.color.white};
  background-color: ${(p) => p.theme.color.green};
  cursor: pointer;
  border: ${(p) =>
    p.listening ? `3px solid ${p.theme.color.green}` : `3px solid transparent`};
  animation: ${(p) => p.listening && `border-pulsate 1s infinite`};
  box-sizing: padding-box;
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
  margin: 10px 0p;
  margin-top: 5px;
`;
