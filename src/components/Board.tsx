import styles from '../../styles/Game.module.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Index2D } from "../interfaces/dimension";
import { RootState } from '../reducers';
import { setCells, plusNumber,  setIsMine, revealCell } from '../reducers/cell';
import { resetMines, setFlagCnt, setMines } from '../reducers/player';
import Cell from './Cell';
import { Level, Stopwatch, StartBtn, FlagCounter } from './GameSetting'
import { getNearIndex } from '../functions';

export default function Board () {
  const dispatch = useDispatch();
  const { cells } = useSelector((state: RootState)=> state.cell)
  const { gameStatus, gameSetting } = useSelector((state: RootState) => state.player)
  const numRows = gameSetting.numRows;
  const numCols = gameSetting.numCols;
  const numMines = gameSetting.numMines;

  
  function createCells (numRows: number, numCols: number) {
    let result = []
    for (let i = 0; i < numRows; i++) {
      let rowCells = []
      for (let j = 0; j < numCols; j ++) {
        rowCells.push(
          {
            posXY: {x:i, y:j},
            isMine: false,
            number: 0,
            revealed: false,
            flagged: false,
          }
        )
      }
      result.push(rowCells)
    }
    return result;
  }

  function createMines (numRows: number, numCols: number, numMines: number)  {
    let result = []
    let numCells = numRows*numCols;
    const mineSet = new Set<number>(); // to avoid duplicates
    
    // generate random numbers as much as # of Mines [0, numCells -1]
    while (mineSet.size < numMines) {
      mineSet.add(Math.floor(Math.random() * numCells))
    }
    
    // change cell state
    mineSet.forEach((mine) => {
      const posXY = {x:Math.floor(mine/numCols), y:mine%numCols}
      result.push(posXY)
      dispatch(setIsMine(posXY));
    })

    return result;
  }

  function createNumbers  (mines: Array<Index2D>) {
    const numRows = gameSetting.numRows;
    const numCols = gameSetting.numCols;
    const numMines = gameSetting.numMines;
    // determine # of adjacent mines
    mines.forEach((mine, index) => {
      const nearIndex = getNearIndex(mine, numRows, numCols);
      nearIndex.forEach((posXY, index) => {
        dispatch(plusNumber(posXY));
      })
    })
  }

  useEffect(()=>{
    if (gameStatus !== "ready") return;
    // reset game first
    dispatch(resetMines());
    dispatch(setFlagCnt(numMines));

    // initialize empty cells
    const emptyCells = createCells(numRows, numCols);
    dispatch(setCells(emptyCells));
    
    // set random mines
    const randomMines = createMines(numRows, numCols, numMines);
    dispatch(setMines(randomMines));

    // set numbers near mines
    createNumbers(randomMines);
  }, [gameStatus, gameSetting.level])

  useEffect(() => {
    if (gameStatus === "fail") {
      cells.forEach((rowCell, index) => {
        rowCell.forEach((cell, index) => {
          dispatch(revealCell(cell.posXY));
        })
      })
    }
  }, [gameStatus])

  return (
    <div className={styles.page}>
      <div className={styles.gameContainer}>
        <div className={styles.gameTopBar}>
          <Level />
          <FlagCounter />
          <StartBtn />
          <Stopwatch />
        </div>
        {
          cells.map((rowCells, index) => {
            return (
              <div key={index} className={styles.rowCell}>
                {           
                  rowCells.map((cell, index) => 
                    <Cell key={index} cell={cell} />
                  )
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
