import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  PlayerNameText,
  PlayerHcpText,
} from "../styled-components/styled-components";
import { useContextState } from "../state/stateprovider";
import { SET_PLAYER_STROKES } from "../state/actionTypes";
import MicIcon from "@material-ui/icons/Mic";
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";
import * as voiceInputs from "../constans/voice-inputs";

const SetPlayerStrokes = ({ player, holeData }) => {
  const { dispatch } = useContextState();

  const [result, setResult] = useState();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => setResult(result),
  });

  const [isListening, setIsListening] = useState(false);
  const listeningDisabled = !window.chrome;
  const inputScoreRef = useRef(null);

  const tryToListen = () => {
    if (!listening) {
      try {
        listen();
        setIsListening(true);
      } catch (error) {
        setIsListening(false);
        console.error(error);
      }
    } else {
      try {
        stop();
        setIsListening(false);
      } catch (error) {
        setIsListening(false);
        console.error(error);
      }
    }
  };

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
      setIsListening(false);
      setNewStrokes(validInput);
      speak({ text: validInput || "none" });
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
  }, [holeData.par, player.name, result]);

  const strokeInputHandler = (input) => {
    if (isNaN(input) || input === "") {
      stop();
      setIsListening(false);
      setNewStrokes(null);
    }
    if (parseInt(input) >= 0 && parseInt(input) <= 19 && input.length <= 2) {
      stop();
      setIsListening(false);
      setNewStrokes(parseInt(input));
    }
  };

  useEffect(() => {
    dispatch({
      type: SET_PLAYER_STROKES,
      strokes: newStrokes,
      holeData: holeData,
      player: player,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newStrokes]);

  useEffect(() => {
    inputScoreRef.current.focus();
  }, []);

  return (
    <SetPlayerStrokesContainer>
      <PlayerNameText>{player.name}</PlayerNameText>
      <PlayerHcpText>{`how many strokes?`}</PlayerHcpText>
      <InputContainer>
        <>
          <VoiceEditor
            onClick={() => !listeningDisabled && tryToListen()}
            listening={isListening}
            disabled={listeningDisabled}
          >
            <ToolTip disabled={listeningDisabled}>disabled</ToolTip>
            <MicIcon style={{ fontSize: 40 }} />
          </VoiceEditor>
          <ScoreText
            ref={inputScoreRef}
            autoFocus
            value={newStrokes || ""}
            type="number"
            pattern="/^[0-9.,]+$/"
            inputMode="decimal"
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
  width: 75px;
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
  opacity: ${(p) => (p.disabled ? 0.2 : 1)};

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
  flex-direction: space-around;
  margin-top: 5px;
`;

const ToolTip = styled.div`
  font-size: 10px;
  display: ${(p) => (!p.disabled ? "none" : "block")};
`;
