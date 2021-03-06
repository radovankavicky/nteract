/* @flow */
import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import epics from "./epics";

const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOADED":
      return Object.assign({}, state, { contents: action.payload });
  }
  return state;
};

type AppState = {};

export default function configureStore(initialState: AppState = {}) {
  const rootEpic = combineEpics(...epics);
  const middlewares = [createEpicMiddleware(rootEpic)];

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
}
