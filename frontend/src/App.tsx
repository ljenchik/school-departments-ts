import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './css/App.css';
import { HomePage } from './components/homePage';

const Paths = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  );
};


const App = () => {
  return (
    <Router>
      <main>
        <Paths />
      </main>
    </Router>
  );
};

export default App;









