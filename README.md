# Atomz (david-gorin.com/atomz)
# How to play?
Atomz is a strategy board game for 2 players. Players take turns adding a single atom to a cell of their choosing. Once a player owns a cell, the other player cannot add their atom directly into it. However, if an explosion caused by one player sends an atom of their color into an enemy cell, that cell is converted. Each of the cells on the 8x8 board can be filled up with a certain number of atoms. The corners can hold a maximum of 2 atoms, the edges a maximum of 3, and the middle pieces a maximum of 4. If a cell is at its maximum capacity, adding another atom to the cell will cause it to explode, sending one atom into every adjacent cell.  The game ends when one player controls the entire board. 
# Why did I make it?
When I was in junior high school, my friends and I would play a game that was very similar to this one on our tablets. I was recently searching for it and saw that it had been taken down, so I decided I would remake the game for the sake of nostalgia.
# How did I make it?
This game was made with React.js with typescript for the frontend and Node.js on the backend. The backend server was made using express and I used the Socket.io library for communication between the frontend and backend. 
# Technical Details
I used a breadth-first search technique to determine how an explosion would radiate from the center(where the player clicked). However, I wanted the player's to be able to see the explosion propogating throughout the board. In order to do this, I needed to count each time a new level was reached in the breadth-first search. To do this, I implemented a double queue approach. This way, each time a queue was fully emptied, I knew that a new level of explosions had begun, so I could animate between these levels. 

