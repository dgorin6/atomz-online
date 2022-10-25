import './Atomz.css';
import Game from './components/Game';
import { JoinRoom } from './components/JoinRoom';
import {useState,useEffect, createContext} from 'react';
import SocketContext from './components/socketContext';
// export interface IJoinRoomProps {socket: any}
export interface IGameProps {setInRoom: any}
const { io } = require("socket.io-client");
const socket = io.connect("https://atomz.herokuapp.com/");
function App() {
  const [inRoom, setInRoom] = useState(false)
  useEffect(() => {
    socket.on('joined', (room: string, player: number) => {
      setInRoom(true);
      socket.emit('sendRoom', room);
      socket.emit('sendPlayer', player);
    })
    socket.on('allReady', (room:string, player: number, pause: boolean) => {
      setInRoom(true);
      socket.emit('sendRoom', room);
      socket.emit('sendPlayer', player);
      socket.emit('allReady', pause);
    })
  },[]);
  
  return (
    <SocketContext.Provider value = {socket}>
      <div className="Atomz">
        <div className="atomz_title">
            <div className='title__1'>At</div>
            <div className = "title__2">:o:</div> <div className='title__3'>mz</div>
            <div className="title__4">||</div>
            <div className="title__5">:o:</div>
        </div>
        {!inRoom && <JoinRoom></JoinRoom>}
        {inRoom &&<Game setInRoom = {setInRoom}></Game>}
      </div>
    </SocketContext.Provider>
  );
}

export default App;
