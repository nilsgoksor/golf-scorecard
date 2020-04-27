import React, { createContext, useContext, useReducer, useEffect } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, children }) => {
  const initialState = {
    players: [],
    hole: 1,
    course: [],
    hcpData: [],
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
