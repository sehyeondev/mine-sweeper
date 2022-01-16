import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';

export default function MineCounter () {
  const { gameSetting } = useSelector((state: RootState)=> state.player)
  
  return (
    <div>
      {gameSetting.totMines}
    </div>
  )
}