import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { setGameLevel } from '../reducers/player';

export default function StartBtn () {
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