import styles from '../../styles/Game.module.css'
import { useStopwatch } from "react-timer-hook"
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { useEffect } from "react";

export default function Stopwatch () {
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