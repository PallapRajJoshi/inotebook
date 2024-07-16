
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import './App.css';
import About from './components/About';
import Alert from "./components/Alert";
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from "./context/notes/NoteState";

function App() {
  return (



    <>
      <NoteState>

        <Router>
          <Navbar />
          <Alert message="this is pallaps react project"/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>

{/* //62 */}

      </NoteState>
    </>

  );
}

export default App;
