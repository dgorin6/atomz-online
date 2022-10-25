import './Atomz.css';
import Game from './components/Game';
import { JoinRoom } from './components/JoinRoom';
import {useState,useEffect} from 'react';
export interface IJoinRoomProps {socket: any}
export interface IGameProps {socket: any, setInRoom: any}
const { io } = require("socket.io-client");
const socket = io.connect("https://atomz.herokuapp.com/");
function App() {
  const [inRoom, setInRoom] = useState(false)
  useEffect(() => {
    socket.on('joined', () => {
      setInRoom(true);
    })
  },[]);
  
  return (
    <div className="Atomz">
      <div className="atomz_title">
          <div className='title__1'>At</div>
          <div className = "title__2">:o:</div> <div className='title__3'>mz</div>
          <div className="title__4">||</div>
          <div className="title__5">:o:</div>
      </div>
      {!inRoom && <JoinRoom socket = {socket}></JoinRoom>}
      {inRoom &&<Game setInRoom = {setInRoom} socket = {socket}></Game>}
    </div>
  );
}

export default App;
