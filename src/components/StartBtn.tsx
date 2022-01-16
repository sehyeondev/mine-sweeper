import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { setGameStatus } from '../reducers/player';

export default function StartBtn () {
  const dispatch = useDispatch();
  const { gameStatus } = useSelector((state: RootState)=> state.player)

  const handleGameStatus = () => {
    switch (gameStatus) {
      case "ready":{
        dispatch(setGameStatus("start"))
        break;
      }
      case "start":{
        dispatch(setGameStatus("ready"))
        break;
      }
      case "success":{
        dispatch(setGameStatus("ready"))
        break;
      }
      case "fail":{
        dispatch(setGameStatus("ready"))
        break;
      }
      default: {
        console.log("im in default")
      }
    }
  }
  return (
    <div>
      {
        (gameStatus === "ready") &&
        <button onClick={() => handleGameStatus()}>start</button>
      }
      {
        (gameStatus === "start") &&
        <button onClick={() => handleGameStatus()}>stop</button>
      }
      {
        ((gameStatus === "success") || (gameStatus === "fail")) &&
        <button onClick={() => handleGameStatus()}>{gameStatus}</button>
      }
    </div>
    
  )
}