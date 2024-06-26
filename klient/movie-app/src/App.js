import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import React from 'react';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import SearchMovie from './components/site-parts/Search';
import PopularMovies from './components/site-parts/PopularMovies';
import AddMovie from './components/site-parts/AddMovie';
import Admin from './components/site-parts/Admin';
import Stats from './components/site-parts/Stats';
import AdminRoute from './helpers/AdminRoute';
import PrivateRoute from './helpers/PrivateRoute';
import UserPage from './components/site-parts/UserPage';
import './components/stylowanie/MainStyle.css';
import keycloak from "./Keycloak";

function App() {
  const { keycloak } = useKeycloak();

  return (
    <div className="App">
      <nav>
        <h1>Movie Database</h1>
        <NavLink to="/" activeClassName="active">Home</NavLink>
        <NavLink to="/add-movie" activeClassName="active">Add Movie</NavLink>
        {keycloak.authenticated && (
          <NavLink to="/user" activeClassName="active">User Page</NavLink>
        )}
        {keycloak.authenticated && keycloak.hasRealmRole("admin") && (
          <NavLink to="/admin" activeClassName="active">Admin Page</NavLink>
        )}
        <NavLink to="/stats" activeClassName="active">Stats</NavLink>
        <div>
          {!keycloak.authenticated ? (
            <button onClick={() => keycloak.login()}>Login</button>
          ) : (
            <button onClick={() => keycloak.logout()}>Logout ({keycloak.tokenParsed.preferred_username})</button>
          )}
        </div>
      </nav>
      <main>
        <div className="search">
          <Routes>
            <Route path="/" element={<SearchMovie />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/user" element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            } />
            <Route path="/admin" element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            } />
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
  );
}
const initOptions = { pkceMethod: 'S256', chceckLoginIframe: false };
export default function AppWithKeycloak() {
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
      <Router>
        <App />
      </Router>
    </ReactKeycloakProvider>
  );
}
