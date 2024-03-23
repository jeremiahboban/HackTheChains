import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Donate from "./pages/Donate";
import Contributions from "./pages/Contributions";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/contributions" element={<Contributions />} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
