import * as actionTypes from "./actionTypes";

export const initialState = {
  players: [{ name: "2222", hcp: "222" }],
};

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
