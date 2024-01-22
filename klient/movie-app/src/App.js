// Import BrowserRouter and Routes from react-router-dom
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import React from 'react';
import SearchMovie from './components/SearchMovie';
import PopularMovies from './components/PopularMovies';
import AddMovie from './components/AddMovie';
import Admin from './components/Admin';
import Stats from './components/Stats';
import './stylowanie/MainStyle.css';

export default function App() {

  return (
    <Router>
      <div className="App">
      <nav>
        <h1>Movie Database</h1>
        <NavLink to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/add-movie" activeClassName="active">Add Movie</NavLink>
        <NavLink to="/admin" activeClassName="active">Admin Page</NavLink>
        <NavLink to="/stats" activeClassName="active">Stats</NavLink>
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
