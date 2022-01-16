import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { setMines } from '../reducers/mine';
import Cell from './Cell';
import MineCounter from './MineCounter';
import StartBtn from './StartBtn';
import Timer from './Timer';
import Level from './Level';
import { CellInterface } from '../interfaces/cell';
import {v4 as uuidv4} from 'uuid'
import { resetGame, addCell, setGameLevel, updateCell } from '../reducers/player';


export default function Board () {
  const dispatch = useDispatch();
  const { mines } = useSelector((state: RootState)=> state.mine)
  const { gameSetting, cells } = useSelector((state: RootState)=> state.player)

  const createCells = (level: string) => {
    dispatch(setGameLevel(level))
    // let result: Array<Array<CellInterface>>;
    // result = []
    let numRows: number, numCols: number, numMines: number;
    // determine numCells and numMines
    switch (level) {
      case "beginner":{
        [numRows, numCols, numMines] = [9, 9, 10]
        break;
      }
      case "intermediate":{
        [numRows, numCols, numMines] = [16, 16, 40]
        break;
      }
      case "expert":{
        [numRows, numCols, numMines] = [16, 30, 99]
        break;
      }
    }

    // initialize cells
    for (let i = 0; i < numRows; i++) {
      // let rowCells = []
      for (let j = 0; j < numCols; j ++) {
        dispatch(addCell(i,j))
        // rowCells.push({
        //   uuid: uuidv4(),
        //   type: "b",
        //   status: "hidden",
        //   posXY: [i,j],
        //   nearMineCnt: 0,
        // })
      }
      // result.push(rowCells)
    }

    // generate random mines
    let numCells = numRows*numCols;
    const mineSet = new Set<number>();
    while (mineSet.size < numMines) {
      mineSet.add(Math.floor(Math.random() * numCells))
    }
    console.log(mineSet)
    console.log(numRows, numCols, numMines)
    mineSet.forEach((mine) => {
      // console.log(mine/9, mine%9)
      // cells[Math.floor(mine/numCols)][mine%numCols].type="m"
      dispatch(updateCell("type", "m", [Math.floor(mine/numCols),mine%numCols]))
    })

    // return result
  }

  useEffect(()=>{
    dispatch(resetGame())
    createCells("beginner")
    // console.log(cells)
    // dispatch(setMines(cells))
  }, [])
  

  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "center",  alignItems: "center"}}>
      <div style ={{border: "solid", width: "50%", textAlign: "center", }}>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center",  alignItems: "center"}}>
          <Level />
          <MineCounter />
          <StartBtn />
          <Timer />
        </div>
        {/* {
          cells.map((rowCells, index) => {
            return (
              <div style={{display: "flex", flexDirection: "row", justifyContent: "center",  alignItems: "center"}} >
                {              
                  rowCells.map((cell, index) => 
                    <Cell cell={cell} />
                  )
                }
              </div>
            )
          })
        } */}
      </div>
    </div>
  )
}