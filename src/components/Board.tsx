import styles from '../../styles/Game.module.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Index2D } from "../interfaces/dimension";
import { RootState } from '../reducers';
import { setCells, plusNumber,  setIsMine, revealCell } from '../reducers/cell';
import { resetMines, setFlagCnt, setGameStatus, setMines } from '../reducers/player';
import Cell from './Cell';
import { Level, Stopwatch, StartBtn, FlagCounter } from './GameSetting'
import { getNearIndex } from '../functions';
import { createCells } from '../functions';


export default function Board () {
  const dispatch = useDispatch();
  const { cells } = useSelector((state: RootState)=> state.cell)
  const { gameStatus, gameSetting } = useSelector((state: RootState) => state.player)
  const numRows = gameSetting.numRows;
  const numCols = gameSetting.numCols;
  const numMines = gameSetting.numMines;

  useEffect(()=>{
    // when game over, reveal all cells
    if (gameStatus === "fail") {
      cells.forEach((rowCell, index) => {
        rowCell.forEach((cell, index) => {
          dispatch(revealCell(cell.posXY));
        })
      })
    }
    // when game started, reset game
    if (gameStatus === "ready"){
      // reset mines first
      dispatch(resetMines());
      dispatch(setFlagCnt(numMines));

      // initialize empty cells
      const emptyCells = createCells(numRows, numCols);
      dispatch(setCells(emptyCells));
    }
  }, [gameStatus])

  useEffect(() => {
    dispatch(setGameStatus("ready"))
  }, [gameSetting.level])


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
