import * as actionTypes from "./actionTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.player],
      };
    default:
      return state;
  }
};
