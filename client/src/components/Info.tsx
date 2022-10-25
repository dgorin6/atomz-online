

export default function Info() {
  return (
    <div className="Atomz">
        <div className="atomz_title">
            <div className='title__1'>At</div>
            <div className = "title__2">:o:</div> <div className='title__3'>mz</div>
            <div className="title__4">||</div>
            <div className="title__5">:o:</div>
        </div>
    <div className= 'info__main'>
        <p className="info__body">Atomz is a strategy board game for 2 players. Players take turns adding a single atom to a cell of their choosing. Once a player owns a cell, the other player cannot add their atom directly into it. However, if an explosion caused by one player sends an atom of their color into an enemy cell, that cell is converted. Each of the cells on the 8x8 board can be filled up with a certain number of atoms. The corners can hold a maximum of 2 atoms, the edges a maximum of 3, and the middle pieces a maximum of 4. If a cell is at its maximum capacity, adding another atom to the cell will cause it to explode, sending one atom into every adjacent cell. 
        The game ends when one player controls the entire board. The best way to learn is to play, so try clicking on "local" and messing around with the board!</p>
    </div>
    </div>
  )
}
