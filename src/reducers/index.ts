import { combineReducers } from "redux";
import cell from "./cell";
import player from "./player";


const appReducer = combineReducers({
  cell,
  player,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>