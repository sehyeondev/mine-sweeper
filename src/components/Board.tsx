import styles from '../../styles/Game.module.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import Cell from './Cell';
import { plusNumber, setCells, setIsMine } from '../reducers/cell';
import { resetGame, setGameStatus, setMines } from '../reducers/player';
import { CellInterface } from '../interfaces/cell';
import { Index2D } from '../interfaces/dimension';
import { getNearIndex } from '../functions';
import StopWatch from './Stopwatch'

export default function Board () {
  const dispatch = useDispatch();
  const { cells } = useSelector((state: RootState)=> state.cell)
  const { flagCnt, gameStatus } = useSelector((state: RootState) => state.player)

  const createMines = (numRows: number, numCols: number, numMines: number) => {
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

  const createNumbers = (mines: Array<Index2D>) => {
    // determine # of adjacent mines
    mines.forEach((mine, index) => {
      const nearIndex = getNearIndex(mine, 9, 9);
      nearIndex.forEach((posXY, index) => {
        dispatch(plusNumber(posXY));
      })
    })
  }

  useEffect(()=>{
    if (gameStatus !== "ready") return;
    // reset game first
    dispatch(resetGame());

    // initialize empty cells
    const emptyCells = createCells();
    dispatch(setCells(emptyCells));
    
    // set random mines
    const randomMines = createMines(9,9,10);
    dispatch(setMines(randomMines));

    // set numbers near mines
    createNumbers(randomMines);
  }, [gameStatus])

  const onStartBtnClick = () => {
    if (gameStatus !== "ready") {
      dispatch(setGameStatus("ready"));
    }
  }
  

  return (
    <div className={styles.page}>
      <div className={styles.gameContainer}>
        <div className={styles.gameTopBar}>
          <div className={styles.flagCnt}>{flagCnt}</div>
          <button className={styles.startBtn}
            onClick={()=>onStartBtnClick()}> game {gameStatus} </button>
          <StopWatch />
        </div>
        {
          cells.map((rowCells, index) => {
            return (
              <div className={styles.rowCell}>
                {           
                  rowCells.map((cell, index) => 
                    <Cell cell={cell} />
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

const createCells = () => {
  let numRows: number, numCols: number;
  [numRows, numCols] = [9, 9];

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