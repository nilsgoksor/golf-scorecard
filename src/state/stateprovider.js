import React, { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, reducer } from "./reducer";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const localState = JSON.parse(localStorage.getItem("state"));

  const [contextState, contextDispatch] = useReducer(
    reducer,
    localState || initialState
  );
  const state = contextState;
  const dispatch = contextDispatch;

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useContextState = () => useContext(StateContext);
