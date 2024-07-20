import React from "react";
import Nav from "../../features/nav/Nav";
import Styles from "./Tutorials.module.css";
import Footer from "../../features/footer/Footer";

const Tutorials = () => {
  return (
    <>
      <Nav />
      <div className={Styles.info}>
        <h1 className={Styles.title}>
          <b>TUTORIALS</b>
        </h1>
        <p className={Styles.subtitle}>
          LET'S LEARN HOW TO USE NATARAJ AI AND GET THE BEST OF OUT IT!
        </p>
      </div>

      <div className={Styles.videos}>
      <p className={Styles.videoheading}>SUPER EASY TO USE, AND THESE TUTORIALS WOULD ONLY MAKE IT EASIER</p>
      </div>
      <Footer/>
    </>
  );
};

export default Tutorials;
