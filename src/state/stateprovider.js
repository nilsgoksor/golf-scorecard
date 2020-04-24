import React, { createContext, useContext, useReducer, useEffect } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, children }) => {
  const initialState = {
    players: [],
    hole: 1,
    course: [
      { hole: 1, name: "pilevallen", length: 451, par: 5, index: 6 },
      { hole: 2, name: "ravinen", length: 157, par: 3, index: 5 },
      { hole: 3, name: "bäckarännan", length: 251, par: 4, index: 9 },
      { hole: 4, name: "frimärket", length: 114, par: 3, index: 2 },
      { hole: 5, name: "vången", length: 161, par: 3, index: 7 },
      { hole: 6, name: "mossen", length: 503, par: 5, index: 4 },
      { hole: 7, name: "märgelhålet", length: 345, par: 4, index: 1 },
      { hole: 8, name: "markvägen", length: 149, par: 3, index: 8 },
      { hole: 9, name: "möllekullen", length: 401, par: 4, index: 3 },
    ],
  };

  const localState = JSON.parse(localStorage.getItem("state"));

  const [state, setState] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={[state, setState]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
