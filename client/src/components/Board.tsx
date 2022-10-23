import React, { Component } from 'react'
import Cell from './Cell'
import { useContext } from 'react';
import { BoardProps } from './Game';
import GameContext from './gameContext';
export interface CellProps {
  r: number;
  c: number;
}
export default function Board({calculateChanges}: BoardProps) {
  const{
    board,
  } = useContext(GameContext)
  return (
    <div className='board'>
        {board.map((row: number[], rindex: number) => {
            return (
            <div key = {rindex} className="board-row">
                {row.map((column: number, cindex) => {
                  return <span key = {'' + rindex + ',' + cindex} onClick = {()=>calculateChanges(rindex,cindex)}><Cell r = {rindex} c = {cindex}></Cell></span>;
                })}
              </div>
            );
          })}
          </div>
  )
}
