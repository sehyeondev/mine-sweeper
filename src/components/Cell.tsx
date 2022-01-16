import { useDispatch, useSelector } from 'react-redux';
import { setGameStatus, updateCell } from '../reducers/player';

export default function Cell ({cell}) {
  const dispatch = useDispatch();

  const handleCell = ({type, status, posXY}) => {
    if (status !== "flagged" && status !== "revealed"){

      if (type === "m"){
        dispatch(setGameStatus("fail"));
      } else{
        dispatch(updateCell("type", "revealed", posXY));
      }
    }
  }
  return (
    <div style={{display: "flex", flexDirection: "column", border: "solid", width: "20px", height: "20px"}}
      onClick={() => handleCell(cell)}>
        {
          (cell.status === "hidden") &&
          <div style={{}}>
            {
              ((cell.type === "m")) && 
              <div style={{backgroundColor:"yellow"}}>X</div>
            }
            {
              ((cell.type === "b")) && 
              <div style={{backgroundColor:"orange"}}>o</div>
            }
            {
              ((cell.type === "number")) && 
              <div style={{backgroundColor:"skyblue"}}>{cell.value}</div>
            }
          </div>
        }
        {
          (cell.status === "revealed") &&
          <div style={{}}>
            {
              ((cell.type === "m")) && 
              <div style={{backgroundColor:"red"}}>X</div>
            }
            {
              ((cell.type === "b")) && 
              <div style={{backgroundColor:"blue"}}>o</div>
            }
            {
              ((cell.type === "number")) && 
              <div style={{backgroundColor:"green"}}>{cell.value}</div>
            }
          </div>
        }
        
      
    </div>
  )
}