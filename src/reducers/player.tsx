import { Index2D } from "../interfaces/dimension";

export const SET_GAME_LEVEL = "SET_GAME_LEVEL" as const;
export const SET_MINES = "SET_MINES" as const;
export const SET_GAME_STATUS = "SET_GAME_STATUS" as const;
export const UPDATE_FLAG_CNT = "UPDATE_FLAG_CNT" as const;
export const RESET_GAME = "RESET_GAME" as const;

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

export const updateFlagCnt = (plus: boolean) => ({
  type: UPDATE_FLAG_CNT,
  payload: {
    plus: plus,
  },
});

export const resetGame = () => ({
  type: RESET_GAME,
})


type PlayerAction = 
  | ReturnType<typeof setGameLevel>
  | ReturnType<typeof setMines>
  | ReturnType<typeof setGameStatus>
  | ReturnType<typeof updateFlagCnt>
  | ReturnType<typeof resetGame>


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
          // cp.numRows = 9;
          // cp.numCols = 9;
          // cp.numMines = 10;
          // flagCnt = 10;0
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
    case UPDATE_FLAG_CNT:{
      let flagCnt = state.flagCnt;
      if (action.payload.plus){
        flagCnt ++;
      } else{
        flagCnt--;
      }
      return {
        ...state,
        flagCnt: flagCnt,
      }
    }
    case RESET_GAME:{
      return{
        ...state,
        gameSetting: {
          mines: []
        },
        gameStatus: "ready",
        flagCnt: state.gameSetting.numMines,
      }
    }
    default:{
      return state;
    }

  }
}

export default player;