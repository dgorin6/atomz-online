import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  return (
    <div className="Atomz">
        <div className="atomz_title">
            <div className='title__1'>At</div>
            <div className = "title__2">:o:</div> <div className='title__3'>mz</div>
            <div className="title__4">||</div>
            <div className="title__5">:o:</div>
        </div>
        <div className="home__buttons">
            <button className="home__button" onClick = {() => {window.location.href = "/info"}}>How to Play</button>
            <button className = 'home__button' onClick = {() => {window.location.href = "https://www.david-gorin.com/atomz"}}>Local</button>
            <button className="home__button" onClick = {() => {window.location.href = "/online"}}>Online</button>
            <button className= 'github__button' onClick = {() => {window.location.href = "https://github.com/dgorin6/atomz-online"}}><FontAwesomeIcon icon={faGithub} /></button>
        </div>
    </div>
  )
}
