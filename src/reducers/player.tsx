import {v4 as uuidv4} from 'uuid'
import { CellInterface } from "../interfaces/cell";
import { SET_MINES } from './mine';

export const RESET_GAME = "RESET_GAME" as const;
export const SET_GAME_LEVEL = "SET_GAME_LEVEL" as const;
export const SET_GAME_STATUS = "SET_GAME_STATUS" as const;
export const ADD_CELL = "ADD_CELL" as const;
export const UPDATE_CELL = "UPDATE_CELL" as const;

export const resetGame = () => ({
  type: RESET_GAME,
})

export const setGameLevel = (level: string) => ({
  type: SET_GAME_LEVEL,
  payload: {
    level: level,
  },
});

export const setGameStatus  = (gameStatus: string) => ({
  type: SET_GAME_STATUS,
  payload: {
    gameStatus: gameStatus,
  },
});

export const addCell = (posX: number, posY: number) => ({
  type: ADD_CELL,
  payload: {
    posXY: [posX, posY],
  }
})

export const setMine = (posX: number, posY: number) => ({
  type: SET_MINES,
  payload: {}
})

export const updateCell = (key: string, newValue: string, posXY: Array<number>) => ({
  type: UPDATE_CELL ,
  payload: {
    key: key,
    newValue: newValue,
    posXY: posXY,
  },
});

type PlayerAction = 
  | ReturnType<typeof resetGame>
  | ReturnType<typeof setGameLevel>
  | ReturnType<typeof setGameStatus>
  | ReturnType<typeof addCell>
  | ReturnType<typeof updateCell>

interface PlayerState {
  gameSetting: SettingInterface;
  gameStatus: string;
  cells: Array<CellInterface>;
}

interface SettingInterface {
  level: string;
  totMines: number;
}

const initialState: PlayerState = {
  gameSetting: {
    level: "beginner",
    totMines: 0,
  },
  gameStatus: "ready",
  cells: []
}

const player = (state: PlayerState = initialState, action: PlayerAction) => {
  switch (action.type) {
    case RESET_GAME:{
      return{
        ...state,
        cells: []
      }
    }
    case SET_GAME_LEVEL:{
      const cp = {...state.gameSetting}
      cp.level = action.payload.level
      // cp.totMines = action.payload.totMines
      switch (action.payload.level) {
        case "beginner":{
          cp.totMines = 10;
          break;
        }
        case "intermediate":{
          cp.totMines = 40;
          break;
        }
        case "expert":{
          cp.totMines = 99;
          break;
        }
      }
      return {
        ...state,
        gameSetting: cp,
      }
    }

    case SET_GAME_STATUS:{
      // switch (action.payload.gameStatus) {
      //   case "ready":{
      //     break;
      //   }
      //   case "start":{
      //     break;
      //   }
      //   case "succes":{
      //     break;
      //   }
      //   case "fail":{
      //     break;
      //   }
      // }
      return {
        ...state,
        gameStatus: action.payload.gameStatus,
      }
    }

    case ADD_CELL:{
      const cp = [...state.cells]
      cp.push({
          type: "b",
          status: "hidden",
          posXY: action.payload.posXY,
          nearMineCnt: 0,
      })
      return {
        ...state,
        cells: cp,
      }
    }

    case UPDATE_CELL:{
      const cp = [...state.cells]
      const cell = cp.find(ele => (ele.posXY[0] === action.payload.posXY[0] && ele.posXY[1] === action.payload.posXY[1]))
      // cp.map((cell) => console.log(cell.posXY))
      console.log(action.payload.key)
      console.log(action.payload.newValue)
      console.log(action.payload.posXY)
      console.log(cell)
      console.log(cp)
      cell[action.payload.key] = action.payload.newValue;
      return {
        ...state,
        cells: cp,
      }
    }
    
    default:
      return state;
  }
}

export default player;