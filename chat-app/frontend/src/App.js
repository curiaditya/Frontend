import Homepage from './Pages/Homepage';
import Chatpage from './Pages/Chatpage';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat" element={<Chatpage />} />
      </Routes>
    </div>
  );
}

export default App;
