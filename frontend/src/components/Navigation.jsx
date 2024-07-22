import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">My App</NavLink>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/people">People</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/groups">Groups</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
