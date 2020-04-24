import * as actionTypes from "./actionTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLAYER:
      const roundData = getRoundData(action.player.hcp);
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
    case actionTypes.SET_HOLE:
      return {
        ...state,
        hole: action.hole,
      };
    case actionTypes.SET_PLAYER_STROKES:
      const modifiedRoundData = action.player.roundData;
      const editIndex = modifiedRoundData.findIndex(
        (h) => h.hole === action.hole
      );
      if (editIndex !== -1) {
        modifiedRoundData[editIndex].data.strokes = action.strokes;
        modifiedRoundData[editIndex].data.score = 2;
      }
      return {
        ...state,
        roundData: modifiedRoundData,
      };
    default:
      return state;
  }
};

const getRoundData = (hcp) => {
  const roundData = [
    { hole: 1, data: { extraStrokes: 2, strokes: null, score: null } },
    { hole: 2, data: { extraStrokes: 2, strokes: null, score: null } },
    { hole: 3, data: { extraStrokes: 2, strokes: null, score: null } },
    { hole: 4, data: { extraStrokes: 2, strokes: null, score: null } },
    { hole: 5, data: { extraStrokes: 2, strokes: null, score: null } },
    { hole: 6, data: { extraStrokes: 2, strokes: null, score: null } },
    { hole: 7, data: { extraStrokes: 2, strokes: null, score: null } },
    { hole: 8, data: { extraStrokes: 2, strokes: null, score: null } },
    { hole: 9, data: { extraStrokes: 2, strokes: null, score: null } },
  ];
  return roundData;
};
