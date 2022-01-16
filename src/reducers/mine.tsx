import { CellInterface } from "../interfaces/cell";

export const SET_MINES = "SET_MINES" as const ;

export const setMines = (mines: Array<Array<CellInterface>>) => ({
  type: SET_MINES,
  payload: {
    mines: mines,
  },
});

type MineAction = 
  | ReturnType<typeof setMines>;

interface MineState{
  mines: Array<Array<CellInterface>>;
}

const initialState = {
  mines: [],
};

const mine = (state: MineState = initialState, action: MineAction) => {
  switch (action.type) {
    case SET_MINES: {
      return {
        ...state,
        mines: action.payload.mines,
      };
    }
    default:
      return state;
  }
}

export default mine