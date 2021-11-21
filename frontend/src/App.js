import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { About } from "./components/about";
import { Users } from "./components/users";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container p-4">
        <Routes >
          <Route path="/about" element={<About/>} />
          <Route path="/" element={<Users/>} />
        </Routes >
      </div>
    </Router>
  );
}

export default App;
