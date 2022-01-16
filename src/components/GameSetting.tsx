import styles from '../../styles/Game.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { setGameStatus, setGameLevel } from '../reducers/player'
import { useStopwatch } from "react-timer-hook"
import { useEffect } from "react";

export function Stopwatch () {
  const { seconds, reset, pause } = useStopwatch({autoStart: false});
  const { gameStatus } = useSelector((state: RootState) => state.player)

  useEffect(() => {
    if (gameStatus === "ready"){
      reset();
      pause();
    } else if (gameStatus === "started"){
      reset();
    } else {
      pause();
    }
  }, [gameStatus])

  return (
    <div className={styles.stopwatch}>
      {seconds}
    </div>
  )
}

export function StartBtn () {
  const dispatch = useDispatch();
  const { gameStatus } = useSelector((state: RootState)=> state.player)

  const onStartBtnClick = () => {
    if (gameStatus !== "ready") {
      dispatch(setGameStatus("ready"));
    }
  }

  return (
    <div>
      <button className={styles.startBtn}
            onClick={()=>onStartBtnClick()}> game {gameStatus} </button>
    </div>
  )
}

export function Level () {
  const dispatch = useDispatch();
  const { gameSetting } = useSelector((state: RootState)=> state.player)

  return (
    <div>
      <select value={gameSetting.level} onChange={(e) => dispatch(setGameLevel(e.target.value))}>
        <option value="beginner">beginner</option>
        <option value="intermediate">intermediate</option>
        <option value="expert">expert</option>
      </select>
    </div>
    
  )
}