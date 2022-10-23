import React from "react";

export interface IGameContextProps {
  board: number[][];
  setBoard: (newBoard: number[][]) => void;
  colors: string[][];
  setColors: (newColors: string[][]) => void;
  currPlayer: string;
  setCurrPlayer: (player: string) => void;
  winner: string;
  setWinner: (winner: string) => void;
  winnerName: string;
  setWinnerName: (winnerName: string) => void
  disabled: boolean;
  setDisabled: (disabled: boolean) => void
}

const defaultState: IGameContextProps = {
  board: Array<number>(8).fill(0).map(() => Array<number>(8).fill(0)),
  setBoard: () => {},
  colors: Array<string>(8).fill('not__taken').map(() => Array<string>(8).fill('not__taken')),
  setColors: () => {},
  currPlayer: "player__1",
  setCurrPlayer: () => {},
  winner: "no__winner",
  setWinner: () => {},
  winnerName: "None",
  setWinnerName: () => {},
  disabled: false,
  setDisabled: () => {}
};

export default React.createContext(defaultState);
