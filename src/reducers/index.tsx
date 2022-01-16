import { combineReducers } from "redux";
import mine from "./mine";
import player from "./player";


const appReducer = combineReducers({
  mine,
  player,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>