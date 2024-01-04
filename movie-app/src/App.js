import React from 'react';
import SearchMovie from './components/SearchMovie'
import PopularMovies from './components/PopularMovies'
import './stylowanie/MainStyle.css'
function App() {
  return (
    <div className="App">
      <nav>
        <h1>Movie Database</h1>
        <div class="autor">Magdalena Hermann</div>
      </nav>
      <main>
        <SearchMovie/>
        <PopularMovies />
      </main>
    </div>
  );
}

export default App;
