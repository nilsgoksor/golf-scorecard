import * as actionTypes from "./actionTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLAYER:
      const roundData = getRoundData(
        state.course,
        state.hcpData,
        action.player.hcp
      );
      return {
        ...state,
        players: [
          ...state.players,
          {
            ...action.player,
            roundData,
          },
        ],
      };
    case actionTypes.REMOVE_PLAYER:
      const modifiedPlayers = state.players;
      const removeIndex = modifiedPlayers.indexOf(action.player);
      if (removeIndex !== -1) {
        modifiedPlayers.splice(removeIndex, 1);
      }
      return {
        ...state,
        players: modifiedPlayers,
      };
    case actionTypes.RESET_ROUND_DATA:
      const modifiedPlayersCleanRound = state.players.map((p) => {
        return {
          ...p,
          roundData: getRoundData(state.course, state.hcpData, p.hcp),
        };
      });
      return {
        ...state,
        players: modifiedPlayersCleanRound,
      };
    case actionTypes.SET_COURSE:
      return {
        ...state,
        course: action.course,
        hcpData: action.hcpData,
      };
    case actionTypes.SET_HOLE:
      return {
        ...state,
        hole: action.hole,
      };
    case actionTypes.SET_PLAYER_STROKES:
      const modifiedRoundData = action.player.roundData;
      const editIndex = modifiedRoundData.findIndex(
        (h) => h.hole === action.holeData.hole
      );

      if (editIndex !== -1) {
        const playerPar =
          action.holeData.par + modifiedRoundData[editIndex].data.extraStrokes;
        const playerScore = 2 + playerPar - action.strokes;
        modifiedRoundData[editIndex].data.strokes = action.strokes;
        modifiedRoundData[editIndex].data.score =
          playerScore >= 0 ? playerScore : 0;

        const modifiedPlayers = state.players.map((p) => {
          if (p.name === action.player.name) {
            return { ...p, roundData: modifiedRoundData };
          }
          return p;
        });
        return {
          ...state,
          players: modifiedPlayers,
        };
      }
      return state;
    default:
      return state;
  }
};

const getRoundData = (course, hcpData, hcp) => {
  const nbrOfHoles = course.length;
  const totalExtraStrokes = getTotalExtraStrokes(hcpData, hcp);
  const courseExtraStrokes = Math.round(totalExtraStrokes / (18 / nbrOfHoles));

  const strokePerHole =
    (courseExtraStrokes - (courseExtraStrokes % nbrOfHoles)) / nbrOfHoles;
  const additionalStrokes = courseExtraStrokes % nbrOfHoles;

  return course.map((holeData) => {
    return {
      hole: holeData.hole,
      data: {
        extraStrokes:
          holeData.index <= additionalStrokes
            ? 1 + strokePerHole
            : strokePerHole,
        strokes: null,
        score: null,
      },
    };
  });
};

const getTotalExtraStrokes = (hcpData, hcp) => {
  return hcpData.find((h) => h.hcpMin <= hcp && h.hcpMax >= hcp).extraStrokes;
};

export const värpingeGKhcpData = [
  { hcpMin: 0, hcpMax: 0.9, extraStrokes: 0 },
  { hcpMin: 1, hcpMax: 1.9, extraStrokes: 1 },
  { hcpMin: 1, hcpMax: 1.9, extraStrokes: 1 },
  { hcpMin: 2, hcpMax: 2.9, extraStrokes: 2 },
  { hcpMin: 3, hcpMax: 3.8, extraStrokes: 3 },
  { hcpMin: 3.9, hcpMax: 4.8, extraStrokes: 4 },
  { hcpMin: 4.9, hcpMax: 5.8, extraStrokes: 5 },
  { hcpMin: 5.9, hcpMax: 6.8, extraStrokes: 6 },
  { hcpMin: 6.9, hcpMax: 7.7, extraStrokes: 7 },
  { hcpMin: 7.8, hcpMax: 8.7, extraStrokes: 8 },
  { hcpMin: 8.8, hcpMax: 9.7, extraStrokes: 9 },
  { hcpMin: 9.8, hcpMax: 10.7, extraStrokes: 10 },
  { hcpMin: 10.8, hcpMax: 11.6, extraStrokes: 11 },
  { hcpMin: 11.7, hcpMax: 12.6, extraStrokes: 12 },
  { hcpMin: 12.7, hcpMax: 13.6, extraStrokes: 13 },
  { hcpMin: 13.7, hcpMax: 14.6, extraStrokes: 14 },
  { hcpMin: 14.6, hcpMax: 15.5, extraStrokes: 15 },
  { hcpMin: 15.6, hcpMax: 16.5, extraStrokes: 16 },
  { hcpMin: 16.6, hcpMax: 17.5, extraStrokes: 17 },
  { hcpMin: 17.6, hcpMax: 18.5, extraStrokes: 18 },
  { hcpMin: 18.6, hcpMax: 19.4, extraStrokes: 19 },
  { hcpMin: 19.5, hcpMax: 20.4, extraStrokes: 20 },
  { hcpMin: 20.5, hcpMax: 21.4, extraStrokes: 21 },
  { hcpMin: 21.5, hcpMax: 22.4, extraStrokes: 22 },
  { hcpMin: 22.5, hcpMax: 23.3, extraStrokes: 23 },
  { hcpMin: 23.4, hcpMax: 24.3, extraStrokes: 24 },
  { hcpMin: 24.4, hcpMax: 25.3, extraStrokes: 25 },
  { hcpMin: 25.4, hcpMax: 26.3, extraStrokes: 26 },
  { hcpMin: 26.4, hcpMax: 27.2, extraStrokes: 27 },
  { hcpMin: 27.3, hcpMax: 28.2, extraStrokes: 28 },
  { hcpMin: 28.3, hcpMax: 29.2, extraStrokes: 29 },
  { hcpMin: 29.3, hcpMax: 30.1, extraStrokes: 30 },
  { hcpMin: 30.2, hcpMax: 31.1, extraStrokes: 31 },
  { hcpMin: 31.2, hcpMax: 32.1, extraStrokes: 32 },
  { hcpMin: 32.2, hcpMax: 33.1, extraStrokes: 33 },
  { hcpMin: 33.2, hcpMax: 34.0, extraStrokes: 34 },
  { hcpMin: 34.1, hcpMax: 35.0, extraStrokes: 35 },
  { hcpMin: 35.1, hcpMax: 36.0, extraStrokes: 36 },
];

export const värpingeGK = [
  { hole: 1, name: "pilevallen", length: 451, par: 5, index: 6 },
  { hole: 2, name: "ravinen", length: 157, par: 3, index: 5 },
  { hole: 3, name: "bäckarännan", length: 251, par: 4, index: 9 },
  { hole: 4, name: "frimärket", length: 114, par: 3, index: 2 },
  { hole: 5, name: "vången", length: 161, par: 3, index: 7 },
  { hole: 6, name: "mossen", length: 503, par: 5, index: 4 },
  { hole: 7, name: "märgelhålet", length: 345, par: 4, index: 1 },
  { hole: 8, name: "markvägen", length: 149, par: 3, index: 8 },
  { hole: 9, name: "möllekullen", length: 401, par: 4, index: 3 },
];
