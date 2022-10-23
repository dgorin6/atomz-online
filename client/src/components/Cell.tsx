import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { CellProps } from './Board'
import { useContext } from 'react'
import gameContext from './gameContext'
export default function Cell ({r, c} : CellProps){ 
  const {board, colors} = useContext(gameContext);
  const calculateCell = (atoms: number) => {
    const circles = [];
    for (let i = 0; i < atoms; i++) {
      let name = 'circles_' + atoms + '_'+ i;
      circles.push(<span className = {name} key = {i}><FontAwesomeIcon icon={faCircle} /></span>);
    }
    let name = 'circles_' + atoms
    return <div className = {name}>{circles}</div>;
  }
  return (
    <button className = {colors[r][c]}>
    {calculateCell(board[r][c])}
    </button>
  )
}
