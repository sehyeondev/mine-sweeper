import styles from '../../styles/Game.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { flagCell, revealCell } from '../reducers/cell';
import React from 'react';
import { CellInterface } from '../interfaces/cell';
import { setGameStatus, updateFlagCnt } from '../reducers/player';
import { Index2D } from '../interfaces/dimension';
import { RootState } from '../reducers';
import { getNearIndex } from '../functions';


export default function Cell ({cell})  {
  const dispatch = useDispatch();
  const { cells } = useSelector((state: RootState) => state.cell)
  const { gameStatus } = useSelector((state: RootState) => state.player)

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
    const nearIndex = getNearIndex(center, 9, 9);
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
    if (gameStatus === "ready") {
      dispatch(setGameStatus("started"))
    }

    if(cell.isMine) {
      dispatch(setGameStatus("fail"))
      return
    }
    dispatch(revealCell(cell.posXY));
    if (cell.number === 0) {
      revealBlanks(cell.posXY);
    }
    checkSuccess(9,9,10);
  }

  const onRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!cell.revealed) {
      dispatch(updateFlagCnt(cell.flagged))
      dispatch(flagCell(cell.posXY, !cell.flagged))
    }
  }
 
  return (
    <div className={styles.cell}
      onClick={() => onLeftClick()}
      onContextMenu={(e) => onRightClick(e)}>
        {
          ((!cell.revealed)) &&
          <div className={styles.hidden}>
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
        }
        {
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
        }
        
    </div>
  )
}