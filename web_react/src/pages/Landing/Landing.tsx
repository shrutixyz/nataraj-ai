import React from "react";
import Nav from "../../features/nav/Nav";
import hero from "../../assets/mascot.svg";
import "./Landing.css";
import createthebeat from "../../assets/createthebeat.svg";
import GradientButton from "../../features/gradientbutton/GradientButton";
import doneimg from "../../assets/done.svg";
import delight from "../../assets/delight.svg";
import Footer from "../../features/footer/Footer";
import googleplay from "../../assets/googleplay.png";
import gemini from "../../assets/gemini.png";

const Landing = () => {
  return (
    <>
      <Nav />



      <section className="hero-section">
        <div className="left">
          <img src={createthebeat} alt="" />
          <p>NATARAJ AI IS YOUR ALL IN ONE AI POWERED DANCE CHOREOGRAPHER</p>
          <GradientButton
            title="GET STARTED"
            width="50"
            height="4"
            fontsize="1.25"
          />
          <br />
          <br />
          <p id="instructions">
            * learn more about the fair use of Artificial Intelligence. <br />*
            learn more about the privacy policy associated with the application.
          </p>
        </div>

        <div className="right">
          <img src={hero} alt="" />
        </div>
      </section>

      <section className="hero-section2">
        <div className="subtitledivhero2">
          <p className="subtitlehero2">FEW CLICKS AND ITS </p>
          <div className="donebox">
            <img src={doneimg} alt="" data-anim="1" data- className="doneimg" />
            <img src={doneimg} alt="" data-anim="2" className="doneimg" />
            <p className="subtitlehero2">DONE</p>
            <img src={doneimg} alt="" data-anim="3" className="doneimg" />
            <img src={doneimg} alt="" data-anim="4" className="doneimg" />
          </div>
        </div>

        <div className="svganimation"></div>
      </section>

      <section className="hero-section3">
        <div className="herosection2title">
          <img src={delight} width={"500rem"} alt="" />
          <p>
            PACKED WITH FEATURES, NATARAJ AI IS SPECIAL BECAUSE IT OFFERS
            OPTIONS THAT NO ONE ELSE DOES
          </p>
        </div>
        <div className="features">
          <div className="featureslist">
            <p>FEATURES</p>
          </div>
        </div>
      </section>
      <section className="android-app-section">
        <div className="android-app-top">
          <p className="downloadapp">
            DOWNLOAD<br></br>ANDROID APP
          </p>
          <img src={googleplay} alt="" className="googleplayimg" />
        </div>
        <div className="android-app-bottom">
          <h1>PROUDLY POWERED BY</h1>
          <img src={gemini} alt="" className="geminiimg" />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Landing;
