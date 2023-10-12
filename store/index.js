import React, { useReducer, createContext, useEffect } from "react";


const initialState = {
  unlocked: false,
  progress: 0,
  questionsInit: [],
  questions: [],
  sentences: [],
  notificationMessage: null
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const newState = state;

    switch (action.type) {
      case "update unlocked":
        return {
          ...newState,
          unlocked: action.value
        };      
      case "update progress":
        return {
          ...newState,
          progress: action.value
        };
      case "update questions":
        return {
          ...newState,
          questions: action.value
        };
      case "update questions init":
        return {
          ...newState,
          questionsInit: action.value
        };
      case "update sentences":
        return {
          ...newState,
          sentences: action.value
        };                
      case "update notification message":
        return {
          ...newState,
          notificationMessage: action.value
        };                       
      default:
        throw new Error();
    }
  }, initialState);


  useEffect(() => {
    // Object.keys(initialState).forEach((item) => {
    //   initialState[`${item}`] = JSON.parse(localStorage.getItem(item));
    // });
  }, []);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
