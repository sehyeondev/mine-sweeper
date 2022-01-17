import { Index2D } from "./interfaces/dimension";

export function getNearIndex (center: Index2D, numRows: number, numCols: number) {
  let result: Array<Index2D> = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i === 0 && j === 0) continue;
      let row = center.x + i;
      let col = center.y + j;
      if (row < 0 || col < 0 || row > numRows-1 || col > numCols-1) continue;
      result.push({x:row, y:col})
    }
  }
  return result;
}

export function createCells (numRows: number, numCols: number) {
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