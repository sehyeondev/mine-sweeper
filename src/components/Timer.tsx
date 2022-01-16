import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';


export default function Timer () {
  const dispatch = useDispatch();
  const { gameStatus } = useSelector((state: RootState)=> state.player)
  const [counter, setCounter] = useState(0);

  useEffect (() => {
    switch (gameStatus) {
      case "ready": {
        setCounter(0);
        break;
      }
      case "start": {
        setTimeout(() => {
          setCounter(counter+1)
        }, 1000)
        break;
      }
      case "succes": {
        setCounter(counter)
        break;
      }
      case "fail": {
        setCounter(counter)
        break;
      }
      default: {
        console.log("im in default")
      }
    }
  }, [gameStatus, counter])
  return (
    <div>{counter}</div>
  )
}