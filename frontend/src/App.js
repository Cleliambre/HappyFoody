import './App.css';
import Inscription from "./Inscription/Inscription";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
        <div className="App">
            <Routes>
                <Route path="/inscription" element={<Inscription/>} />
            </Routes>
        </div>
      </Router>
  );
}

export default App;
