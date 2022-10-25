import React, {createContext} from 'react'
import { Socket } from 'socket.io-client'
const { io } = require("socket.io-client");
const socket = io.connect("https://atomz.herokuapp.com/");

const SocketContext = React.createContext<Socket>(socket)

export default SocketContext