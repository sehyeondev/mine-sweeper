import { CellInterface } from "../interfaces/cell";
import { Index2D } from "../interfaces/dimension";

export const SET_CELLS = "SET_CELLS" as const;
export const SET_IS_MINE = "SET_IS_MINE" as const;
export const PLUS_NUMBER = "PLUS_NUMBER" as const;
export const REVEAL_CELL = "REVEAL_CELL" as const;
export const FLAG_CELL = "FLAG_CELL" as const;

export const setCells = (cells: Array<Array<CellInterface>>) => ({
  type: SET_CELLS,
  payload: {
    cells: cells,
  }
})

export const setIsMine = (posXY: Index2D) => ({
  type: SET_IS_MINE,
  payload: {
    posXY: posXY,
  }
})

export const plusNumber = (posXY: Index2D) => ({
  type: PLUS_NUMBER,
  payload: {
    posXY: posXY,
  }
})

export const revealCell = (posXY: Index2D) => ({
  type: REVEAL_CELL,
  payload: {
    posXY: posXY,
  }
})

export const flagCell = (posXY: Index2D, flagged: boolean) => ({
  type: FLAG_CELL,
  payload: {
    posXY: posXY,
    flagged: flagged,
  }
})


type CellAction = 
  | ReturnType<typeof setCells>
  | ReturnType<typeof revealCell>
  | ReturnType<typeof flagCell>
  | ReturnType<typeof plusNumber>
  | ReturnType<typeof setIsMine>

interface CellState {
  cells: Array<Array<CellInterface>>
}

const initialState = {
  cells: [[]]
}

const cell = (state: CellState = initialState, action: CellAction) => {
  switch (action.type) {
    case SET_CELLS:{
      return {
        ...state,
        cells: action.payload.cells,
      }
    }
    
    case SET_IS_MINE:{
      let x = action.payload.posXY.x;
      let y = action.payload.posXY.y;
      const cp = [...state.cells]
      cp[x][y].isMine = true;
      return{
        ...state,
        cells: cp,
      }
    }
    case PLUS_NUMBER:{
      let x = action.payload.posXY.x;
      let y = action.payload.posXY.y;
      const cp = [...state.cells]
      if (!cp[x][y].isMine)
        cp[x][y].number++;
      return{
        ...state,
        cells: cp,
      }
    }
    case REVEAL_CELL:{
      let x = action.payload.posXY.x;
      let y = action.payload.posXY.y;
      const cp = [...state.cells]
      cp[x][y].revealed = true;
      return{
        ...state,
        cells: cp,
      }
    }

    case FLAG_CELL:{
      let x = action.payload.posXY.x;
      let y = action.payload.posXY.y;
      const cp = [...state.cells]
      cp[x][y].flagged = action.payload.flagged;
      return{
        ...state,
        cells: cp,
      }
    }
    default:
      return state
  }
}

export default cell;