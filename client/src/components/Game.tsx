import Board from "./Board"
import React, { useContext, useState, useEffect} from 'react'
import GameContext from "./gameContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import SocketContext from "./socketContext";
import { IGameProps } from "./Online";

const sleep = (ms:number) => new Promise(
  resolve => setTimeout(resolve, ms)
);
export interface BoardProps {
    calculateChanges: (r: number, c:number) => void
  }

export default function Game({setInRoom}: IGameProps){
    const[board,setBoard] = useState((Array<number>(8).fill(0).map(() => Array<number>(8).fill(0))));
    const[colors,setColors] = useState(Array<string>(8).fill('not__taken').map(() => Array<string>(8).fill('not__taken')))
    const[winner,setWinner] = useState("no__winner");
    const[winnerName,setWinnerName] = useState("None");
    const[disabled,setDisabled] = useState(false);
    const[currPlayer,setCurrPlayer] = useState("player__1");
    const[isPlayerTurn, setPlayerTurn] = useState(true);
    const[gameStart, setGameStart] = useState(false);
    const[roomCode, setRoomCode] = useState('');
    const[player, setPlayer] = useState(0)
    const socket = useContext(SocketContext)
    const restartGame = () => {
        setCurrPlayer("player__1");
        setWinner("no__winner");
        setWinnerName("None");
        setBoard(Array<number>(8).fill(0).map(() => Array<number>(8).fill(0)));
        setColors(Array<string>(8).fill('not__taken').map(() => Array<string>(8).fill('not__taken')));
    }
    const changeTeam = () => {
        setPlayerTurn(false);
        if(currPlayer == "player__1") {
            setCurrPlayer("player__2")
        } else {
            setCurrPlayer("player__1")
        }
    }
    const updateBoard = (board: number[][],colors: string[][]) => {
        setBoard([...board]);
        setColors([...colors]);
    }
    const explosion  = (curr: number[],board: number[][]) => {
        let max = 0
        if (((curr[0] == 0) || (curr[0]==7)) && ((curr[1]==0) || (curr[1]==7))) {
            max = 2
        } else if(curr[0] == 0 || curr[0] == 7|| curr[1]==0|| curr[1]==7) {
            max = 3
        } else {
            max = 4
        }
        if (board[curr[0]][curr[1]] > max) {
            return true;
        }
        return false;
    }
    const calculateChanges = async (r: number,c: number) => {
        if(!gameStart||!isPlayerTurn||disabled||(colors[r][c] != currPlayer  && colors[r][c] != "not__taken") || winner!="no__winner") {
            return;
        }
        setDisabled(true);
        let newBoard = board;
        let newColors = colors;
        let queue1: number[][] = [];
        let queue2: number[][] = [];
        queue1.push([r,c]);
        while((queue1.length > 0 || queue2.length > 0) && winner == "no__winner") {
            for (let i = 0; i < queue1.length; i++) {
                let curr = queue1[i]
                newBoard[curr[0]][curr[1]]+=1
                newColors[curr[0]][curr[1]] = currPlayer;
            }
            if (queue1.length == 1 && explosion(queue1[0],newBoard)) {
                await sleep(200);
            } else if (queue1.length > 1) {
                await sleep(200);
            }
            updateBoard(newBoard,newColors);
            socket.emit('updateBoard',board,colors);
            while(queue1.length > 0) {
                let curr: number[] = queue1.shift()!;
                newColors[curr[0]][curr[1]] = currPlayer;
                let original = newBoard[curr[0]][curr[1]] - 1;
                if (((curr[0] == 0) || (curr[0]==7)) && ((curr[1]==0) || (curr[1]==7))) {
                    newBoard[curr[0]][curr[1]]  = (newBoard[curr[0]][curr[1]] - 1) % 2 + 1;
                } else if(curr[0] == 0 || curr[0] == 7|| curr[1]==0|| curr[1]==7) {
                    newBoard[curr[0]][curr[1]]  = (newBoard[curr[0]][curr[1]] - 1) % 3 + 1;
                } else {
                    newBoard[curr[0]][curr[1]]  = (newBoard[curr[0]][curr[1]] - 1) % 4 + 1;
                }
                if (newBoard[curr[0]][curr[1]] < original) {
                    for (let i = -1; i<=1; i+=2){
                        if(curr[0] + i >= 0 && curr[0] + i < newBoard.length) {
                                queue2.push([curr[0] + i,curr[1]]);
                            }
                    }
                    for (let i = -1; i<=1; i+=2){
                        if(curr[1] + i >= 0 && curr[1] + i < newBoard.length) {
                                queue2.push([curr[0] ,curr[1] + i]);
                            }
                    }
                }
        }
        for (let i = 0; i < queue2.length; i++) {
            let curr = queue2[i]
            newBoard[curr[0]][curr[1]]+=1
            newColors[curr[0]][curr[1]] = currPlayer;
        }
        updateBoard(newBoard,newColors);
        socket.emit('updateBoard',board,colors);
        if (queue2.length > 0) {
            await sleep(200);
        }
        while(queue2.length > 0) {
            let curr: number[] = queue2.shift()!;
            newColors[curr[0]][curr[1]] = currPlayer;
            let original = newBoard[curr[0]][curr[1]] - 1;
            if (((curr[0] == 0) || (curr[0]==7)) && ((curr[1]==0) || (curr[1]==7))) {
                newBoard[curr[0]][curr[1]]  = (newBoard[curr[0]][curr[1]] - 1) % 2 + 1;
            } else if(curr[0] == 0 || curr[0] == 7|| curr[1]==0|| curr[1]==7) {
                newBoard[curr[0]][curr[1]]  = (newBoard[curr[0]][curr[1]] - 1) % 3 + 1;
            } else {
                newBoard[curr[0]][curr[1]]  = (newBoard[curr[0]][curr[1]] - 1) % 4 + 1;
            }
            if (newBoard[curr[0]][curr[1]] < original) {
                for (let i = -1; i<=1; i+=2){
                    if(curr[0] + i >= 0 && curr[0] + i < newBoard.length) {
                            queue1.push([curr[0] + i,curr[1]]);
                        }
                }
                for (let i = -1; i<=1; i+=2){
                    if(curr[1] + i >= 0 && curr[1] + i < newBoard.length) {
                            queue1.push([curr[0] ,curr[1] + i]);
                        }
                }
            }
        }
        let count = 0;
        let empty = 0;
        for (let i = 0; i < colors.length; i++) {
            for(let j = 0; j < colors[0].length; j++) {
                if(colors[i][j] == "player__1") {
                    count++;
                } else if(colors[i][j] == "not__taken") {
                    empty+=1
                }
            }
        }
        if(count == 64 && empty == 0) {
           setWinner("win_player_1")
           setWinnerName("Player 1")
           socket.emit('winner', 1)
        } else if(count == 0 && empty == 0) {
            setWinner("win_player_2")
            setWinnerName("Player 2")
            socket.emit('winner', 2)
        }
    }
    changeTeam();
    socket.emit('changePlayer');
    setDisabled(false);
    }
    const handleLeave =() => {
        setInRoom(false);
        socket.emit('leaveRoom')
    }
    socket.on('changePlayer',() => {
        changeTeam();
        setPlayerTurn(true);
    });
    socket.on('resumeGame', () => {
        socket.emit('updateBoard', board, colors)
        socket.emit('setCurrPlayer', !isPlayerTurn)
        socket.emit('setColor', currPlayer);
    })
    socket.on('roomCode', (room: string) => {
        setRoomCode(room);
    });
    socket.on('player', (player: number) => {
        setPlayer(player);
    });
    socket.on('setColor', (color: string) => {
        setCurrPlayer(color);
    });
    socket.on('initGame', () => {
        setGameStart(true);
    });
    useEffect(() => {
        socket.on('updateBoard', (board: number[][],colors: string[][]) => {
            updateBoard(board,colors);
        });
        socket.on('play again', () => {
            alert("Rematch Accepted by Opponent");
        })
        socket.on('restart', () => {
            restartGame();
        })
        socket.on('setCurrPlayer', (turn: boolean)=> {
            setPlayerTurn(turn);
        }) 
        socket.on('winner', (num: number) => {
            if(num == 1) {
                setWinner("win_player_1")
                setWinnerName("Player 1")
            } else {
                setWinner("win_player_2")
                setWinnerName("Player 2")
            }
        });
        socket.on('pauseGame', () => {
            setGameStart(false);
        })
    },[])
  return (
    <GameContext.Provider value = {{board,setBoard,colors,setColors,currPlayer,setCurrPlayer,winner,setWinner,winnerName,setWinnerName,disabled,setDisabled}}>
    <div className="game">
        <button className = 'leave__game' onClick={handleLeave}> Leave </button>
        {!gameStart && <h1 className="waiting"><div>waiting for opponent...</div><div>Room Code: {roomCode}</div></h1>}
        <div className="atomz__main">
        {winner != "no__winner" && <div className={winner}> Winner: {winnerName}</div>}
        {winner === 'no__winner' && <div>
            {isPlayerTurn && <div className={"move__player" + player}>Your Move <FontAwesomeIcon icon={faCircle} /></div>}
            {!isPlayerTurn && <div className={"not__move__player" + player}> Opponent Move <FontAwesomeIcon icon={faCircle} /></div>}
        </div>}
        <Board calculateChanges={calculateChanges}></Board>
        {winner != "no__winner" && <button onClick = {() => socket.emit('play again')} className="new__game">Play Again</button>}
        </div>
    </div>
  </GameContext.Provider>
   
  )
}
