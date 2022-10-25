import React, { useContext, useState } from "react";
import styled from "styled-components";
import SocketContext from "./socketContext";

const JoinRoomContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2em;
`;

const RoomIdInput = styled.input`
  height: 30px;
  width: 20em;
  font-size: 17px;
  outline: none;
  border: 1px solid #8e44ad;
  border-radius: 3px;
  padding: 0 10px;
`;

const JoinButton = styled.button`
  outline: none;
  background-color: blue;
  color: #fff;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    border: 2px solid blue;
    color: blue;
  }
`;
const CreateButton = styled.button`
  outline: none;
  background-color: blue;
  color: #fff;
  font-size: 17px;
  border: 2px solid transparent;
  border-radius: 5px;
  padding: 4px 18px;
  transition: all 230ms ease-in-out;
  margin-top: 1em;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    border: 2px solid blue;
    color: blue;
  }
`;

export function JoinRoom() {
  const socket = useContext(SocketContext)
  const [roomName, setRoomName] = useState("");
  const [isJoining, setJoining] = useState(false);
  const handleRoomNameChange = (e: React.ChangeEvent<any>) => {
    const value = e.target.value;
    setRoomName(value);
  };
  const joinRoom = async (e: React.FormEvent) => {
    e.preventDefault();  
    setJoining(true);
    socket.emit('join', roomName, (success: boolean) => {
      if (!success) {
        alert('Room does not exist or is full');
      }
    });
    setJoining(false);
  };
  const generateRoom = () => {
    socket.emit('createRoom');
  }
  
  return (
    <JoinRoomContainer>
    <CreateButton onClick = {generateRoom}>Create</CreateButton>
    <form onSubmit={joinRoom}>
        <h4>Enter Room ID to Join A Game</h4>
        <RoomIdInput
          placeholder="Room ID"
          value={roomName}
          onChange = {handleRoomNameChange}
        />
        <JoinButton type="submit" disabled={isJoining}>
          {isJoining ? "Joining..." : "Join"}
        </JoinButton>
      </form>
    </JoinRoomContainer>
  );
}