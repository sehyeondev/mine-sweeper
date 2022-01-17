import styles from '../../styles/Game.module.css'
import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { setGameStatus, updateFlagCnt } from '../reducers/player';
import { killCell, flagCell, setCells, plusNumber,  setIsMine, revealCell } from '../reducers/cell';
import { resetMines, setFlagCnt, setMines } from '../reducers/player';
import { Index2D } from '../interfaces/dimension';
import { RootState } from '../reducers';
import { getNearIndex } from '../functions';
import { createCells } from '../functions';

const cx = classNames.bind(styles);

export default function Cell ({cell})  {
  const dispatch = useDispatch();
  const { cells } = useSelector((state: RootState) => state.cell)
  const { gameStatus, gameSetting } = useSelector((state: RootState) => state.player)
  const numRows = gameSetting.numRows;
  const numCols = gameSetting.numCols;
  const numMines = gameSetting.numMines;

  function createMines (numRows: number, numCols: number, numMines: number, startCell: Index2D)  {
    let result = []
    const  numCells = numRows*numCols;
    const mineSet = new Set<number>(); // to avoid duplicates
    // make center and its adjacent cells as blanks
    const blanks = getNearIndex(startCell, numRows, numCols,);
    blanks.push(startCell)
    const newBlanks = blanks.map(ele => ele.x*numCols + ele.y)
    // generate random numbers as much as # of Mines [0, numCells -1]
    while (mineSet.size < numMines) {
      let randNum = Math.floor(Math.random() * numCells);
      if (newBlanks.includes(randNum)) {
        continue
      };
      mineSet.add(randNum)
    }
    // change cell state as mine
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
    // determine # of adjacent mines
    mines.forEach((mine, index) => {
      const nearIndex = getNearIndex(mine, numRows, numCols);
      nearIndex.forEach((posXY, index) => {
        dispatch(plusNumber(posXY));
      })
    })
  }

  const checkSuccess = (numRows: number, numCols: number, numMines: number) => {
    let remainder = numRows*numCols;
    for (let x=0; x < numRows; x++) {
      for (let y=0; y < numCols; y++){
        if (cells[x][y].revealed) {
          remainder --;
        }
      }
    }
    if (remainder === numMines) {
      dispatch(setGameStatus("success"))
    }
    console.log("im in check success")
    console.log(remainder)
  }


  const revealBlanks = (center: Index2D) => {
    const nearIndex = getNearIndex(center, numRows, numCols);
    nearIndex.forEach((posXY, index) => {
      const cell = cells[posXY.x][posXY.y];
      if (cell.revealed){
        return;
      }
      dispatch(revealCell(posXY));
      if (cell.number === 0){
        revealBlanks(posXY)
      }
    })
  }

  const onLeftClick = () => {
    if (gameStatus === "fail" || gameStatus === "success") return;

    if (gameStatus === "ready") {
      dispatch(setGameStatus("started"))
      // set random mines
      const randomMines = createMines(numRows, numCols, numMines, cell.posXY);
      dispatch(setMines(randomMines));
      // set numbers near mines
      createNumbers(randomMines);
    }

    // if clicked cell is mine, game over
    if(cell.isMine) {
      dispatch(killCell(cell.posXY))
      dispatch(setGameStatus("fail"))
      return
    }
    // reveal cell => if number, continue
    //                if blank, reveal blanks until number cell appears
    //                then, check success
    dispatch(revealCell(cell.posXY));
    if (cell.number === 0) {
      revealBlanks(cell.posXY);
    }
    checkSuccess(numRows,numCols,numMines);
  }

  const onRightClick = (e: React.MouseEvent) => {
    if (gameStatus != "started") return;
    e.preventDefault();
    // update plus or minus one to flagCnt
    if (!cell.revealed) {
      dispatch(updateFlagCnt(cell.flagged))
      dispatch(flagCell(cell.posXY, !cell.flagged))
    }
  }
 
  return (
    <div className={cx('cell')}
      onClick={() => onLeftClick()}
      onContextMenu={(e) => onRightClick(e)}>
        {/* <div className={cx({
          hidden: !cell.revealed,
          revealed: cell.revealed,
          number: cell.number >0,
          mine: cell.isMine,
          blank: cell.number === 0,
        })}></div> */}
        
            {
              ((cell.isMine)) && 
              <div className={cx( 'mine', {
                hidden: !cell.revealed,
                flagged: cell.flagged,
                dead: cell.number === -44,
              })}>
                X
                </div>
            }
            {
              ((cell.number>0) && !(cell.isMine)) && 
              <div className={cx( 'number', {
                hidden: !cell.revealed,
                flagged: cell.flagged,
                dead: cell.number === -44,
              })}>
                {cell.number}
              </div>
            }
            {
              ((cell.number==0) && !(cell.isMine)) && 
              <div className={cx( 'blank', {
                hidden: !cell.revealed,
                flagged: cell.flagged,
                dead: cell.number === -44,
              })}>

              </div>
            }
        
        {/* {
          ((cell.revealed)) &&
          <div className={styles.revealed}>
            {
              ((cell.isMine)) && 
              <div className={styles.mine}>X</div>
            }
            {
              ((cell.number>0) && !(cell.isMine)) && 
              <div className={styles.number}>{cell.number}</div>
            }
            {
              ((cell.number==0) && !(cell.isMine)) && 
              <div className={styles.blank}></div>
            }
          </div>
        } */}
    </div>
  )
}