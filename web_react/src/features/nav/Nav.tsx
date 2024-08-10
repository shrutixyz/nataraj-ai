import React, { useEffect } from "react";
import logofull from "../../assets/logofull.svg";
import "../nav/Nav.css";
import { NavLink, useNavigate } from "react-router-dom";
import GradientButton from "../gradientbutton/GradientButton";
import { useSelector } from "react-redux";
import {auth} from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { logout } from "../../store/store";

const Nav = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const signOut = async() =>{
    await auth.signOut();
    dispatch(logout());
  }
  useEffect(() => {
    console.log("nav", isLoggedIn);
  }, []);

  return (
    <div className="nav-container">
      <div className="logo-container" onClick={() => navigate("/")}>
        <img src={logofull} className="logofull" alt="nataraj-ai logo" />
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
      {isLoggedIn ? (
        <div className="sign-up-container">
          <GradientButton
            title="SIGN OUT"
            onClick={() => {signOut()}}
            height="2"
            width="8"
          />
          <GradientButton
            title="YOUR PROFILE"
            onClick={() => navigate("/profile")}
            height="2"
            width="8"
          />
        </div>
      ) : (
        <div className="sign-up-container">
          <GradientButton
            title="SIGN UP NOW"
            onClick={() => navigate("/signup")}
            height="2"
            width="12"
          />
        </div>
      )}
    </div>
  );
};

export default Nav;
