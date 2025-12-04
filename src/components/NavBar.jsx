import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")}>
        KPL Manager 🏏
      </div>
      <nav className="navbar-links">
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/matches">Matches</NavLink>
        <NavLink to="/sponsors">Sponsors</NavLink>
        <NavLink to="/add-team">Add Team</NavLink>
      </nav>
    </header>
  );
};

export default NavBar;