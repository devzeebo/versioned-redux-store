import { combineReducers } from "redux";

const versionReducer = initialState => (state = initialState) => {
  return state;
};

export const reducer = combineReducers({
  // YOUR_OTHER_REDUCERS
  version: versionReducer({/* You could set you defauklt version here if you wish */})
});

export default { reducer };
