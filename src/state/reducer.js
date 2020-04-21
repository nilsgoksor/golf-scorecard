import * as actionTypes from "./actionTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.player],
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
    default:
      return state;
  }
};
