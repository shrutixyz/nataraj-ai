import React from "react";
import logo from "../../assets/logo.svg";
import '../nav/Nav.css'
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <img src={logo} alt="nataraj-ai logo" />
        <p>nataraj ai</p>
      </div>
      <div className="navlinks-container">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link inactive' 
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link inactive'
          }
        >
          About
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link inactive'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tutorials"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link inactive'
          }
        >
          Tutorials
        </NavLink>

      </div>
      <div className="sign-up-container">
        <button>Sign up now</button>
      </div>
    </div>
  );
};

export default Nav;
