import { Index2D } from "../interfaces/dimension";

export const SET_GAME_LEVEL = "SET_GAME_LEVEL" as const;
export const SET_MINES = "SET_MINES" as const;
export const SET_GAME_STATUS = "SET_GAME_STATUS" as const;
export const SET_FLAG_CNT = "SET_FLAG_CNT" as const;
export const UPDATE_FLAG_CNT = "UPDATE_FLAG_CNT" as const;
export const RESET_MINES = "RESET_MINES" as const;

export const setGameLevel = (level: string) => ({
  type: SET_GAME_LEVEL,
  payload: {
    level: level,
  },
});

export const setMines = (mines: Array<Index2D>) => ({
  type: SET_MINES,
  payload: {
    mines: mines,
  },
});

export const setGameStatus  = (gameStatus: string) => ({
  type: SET_GAME_STATUS,
  payload: {
    gameStatus: gameStatus,
  },
});

export const setFlagCnt = (flagCnt: number) => ({
  type: SET_FLAG_CNT,
  payload: {
    flagCnt: flagCnt,
  }
})

export const updateFlagCnt = (plus: boolean) => ({
  type: UPDATE_FLAG_CNT,
  payload: {
    plus: plus,
  },
});

export const resetMines = () => ({
  type: RESET_MINES,
})


type PlayerAction = 
  | ReturnType<typeof setGameLevel>
  | ReturnType<typeof setMines>
  | ReturnType<typeof setGameStatus>
  | ReturnType<typeof setFlagCnt>
  | ReturnType<typeof updateFlagCnt>
  | ReturnType<typeof resetMines>


interface PlayerState {
  gameSetting: SettingInterface;
  gameStatus: string;
  flagCnt: number;
}

interface SettingInterface {
  level: string;
  numRows: number;
  numCols: number;
  numMines: number;
  mines: Array<Index2D>;
}

const initialState: PlayerState = {
  gameSetting: {
    level: "beginner",
    numRows: 9,
    numCols: 9,
    numMines: 10,
    mines: []
  },
  gameStatus: "ready",
  flagCnt: 10,
}

const player = (state: PlayerState = initialState, action: PlayerAction) => {
  switch (action.type) {
    case SET_GAME_LEVEL:{
      const cp = {...state.gameSetting};
      let flagCnt = state.flagCnt;
      cp.level = action.payload.level;
      switch (action.payload.level) {
        case "beginner":{
          [cp.numRows, cp.numCols, cp.numMines, flagCnt] = [9,9,10,10]
          break;
        }
        case "intermediate":{
          [cp.numRows, cp.numCols, cp.numMines, flagCnt] = [16,16,40,40]
          break;
        }
        case "expert":{
          [cp.numRows, cp.numCols, cp.numMines, flagCnt] = [16,30,99,99]
          break;
        }
      }
      return {
        ...state,
        gameSetting: cp,
        flagCnt: flagCnt,
      }
    }
    case SET_MINES:{
      const cp = {...state.gameSetting};
      cp.mines = action.payload.mines;
      return {
        ...state,
        gameSetting: cp,
      }
    }
    case SET_GAME_STATUS:{
      return {
        ...state,
        gameStatus: action.payload.gameStatus,
      }
    }
    case SET_FLAG_CNT:{
      return {
        ...state,
        flagCnt: action.payload.flagCnt
      }
    }
    case UPDATE_FLAG_CNT:{
      let cp = state.flagCnt;
      if (action.payload.plus){
        cp++;
      } else{
        cp--;
      }
      return {
        ...state,
        flagCnt: cp,
      }
    }
    case RESET_MINES:{
      const cp = {...state.gameSetting};
      cp.mines = [];
      return{
        ...state,
        gameSetting: cp,
      }
    }
    default:{
      return state;
    }

  }
}

export default player;