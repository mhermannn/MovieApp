// Import BrowserRouter and Routes from react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import React, { useState } from 'react';
import SearchMovie from './components/SearchMovie';
import PopularMovies from './components/PopularMovies';
import AddMovie from './components/AddMovie';
import Admin from './components/Admin';
import Stats from './components/Stats';
import './stylowanie/MainStyle.css';

export default function App() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <Router>
      <div className="App">
        <nav>
          <h1>Movie Database</h1>
          {/* <div className="autor">Magdalena Hermann</div> */}
          <Link to="/">Home</Link>
          <Link to="/add-movie">Add Movie</Link>
          <Link to="/admin">Admin Page</Link>
          <Link to="/stats">Stats</Link>
        </nav>
        <main>
          <div className="search">
            <Routes>
              <Route path="/" element={<SearchMovie />} />
              <Route path="/add-movie" element={<AddMovie />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </div>
          <div className="pop">
            <Routes>
              <Route path="/" element={<PopularMovies />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
