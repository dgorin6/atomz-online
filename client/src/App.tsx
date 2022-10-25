import './Atomz.css';
import Online from './components/Online';
import { BrowserRouter } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import Info from './components/Info';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {<Home />}></Route>
      <Route path = "/online" element = {<Online />}></Route>
      <Route path = "/info" element = {<Info />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
