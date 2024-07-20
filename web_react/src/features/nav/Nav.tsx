import React from "react";
import logofull from "../../assets/logofull.svg";
import "../nav/Nav.css";
import { NavLink } from "react-router-dom";
import GradientButton from "../gradientbutton/GradientButton";

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <img src={logofull} alt="nataraj-ai logo" />
      </div>
      <div className="navlinks-container">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link inactive"
          }
        >
          <p className="animated-underline">Home</p>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link inactive"
          }
        >
          <p className="animated-underline">About</p>
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link inactive"
          }
        >
          <p className="animated-underline">Dashboard</p>
        </NavLink>
        <NavLink
          to="/tutorials"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link inactive"
          }
        >
          <p className="animated-underline">Tutorials</p>
        </NavLink>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link inactive"
          }
        >
          <p className="animated-underline">Blogs</p>
          
        </NavLink>
      </div>
      <div className="sign-up-container">
        <GradientButton title="SIGN UP NOW" onClick={()=>console.log("check")} height="3" width="15"/>
      </div>
    </div>
  );
};

export default Nav;
