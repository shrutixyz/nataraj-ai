import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import feature1 from "../../assets/feature1.svg";
import feature2 from "../../assets/feature2.svg";
import feature3 from "../../assets/feature3.svg";
import feature4 from "../../assets/feature4.svg";
import feature5 from "../../assets/feature5.svg";
import feature6 from "../../assets/feature6.svg";
import Threed_model from "../../features/fbxmodel/FBXModel";

const Landing = () => {
  const navigate = useNavigate();
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered6, setIsHovered6] = useState(false);

  const handleHover1 = () => {
    setIsHovered1(!isHovered1);
  };
  const handleHover2 = () => {
    setIsHovered2(!isHovered2);
  };
  const handleHover3 = () => {
    setIsHovered3(!isHovered3);
  };
  const handleHover4 = () => {
    setIsHovered4(!isHovered4);
  };
  const handleHover5 = () => {
    setIsHovered5(!isHovered5);
  };
  const handleHover6 = () => {
    setIsHovered6(!isHovered6);
  };
  return (
    <>
    {/* <Threed_model/> */}
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
            onClick={() => navigate("/login")}
          />
          <br />
          <br />
          <p id="instructions" onClick={()=>window.location.href='https://hai.stanford.edu/news/reexamining-fair-use-age-ai'}>
            * learn more about the fair use of Artificial Intelligence.
          </p>
          <p id="instructions" onClick={()=>navigate('/privacy')}>
            *
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

        <div className="svganimation">
          <video autoPlay loop muted style={{ width: "100%", height: "100%" }}>
            <source
              src="https://firebasestorage.googleapis.com/v0/b/nataraj-ai.appspot.com/o/landing.mp4?alt=media&token=8d660569-593d-45d4-abc8-89d060a1eab6"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="hero-section3">
        <div className="herosection2title">
          <img src={delight} width={"500rem"}  />
          <p>
            PACKED WITH FEATURES, NATARAJ AI IS SPECIAL BECAUSE IT OFFERS
            OPTIONS THAT NO ONE ELSE DOES
          </p>
        </div>
        <div className="features">
          <div className="featureslist">
            <b><h3>FEATURES</h3></b>
            <div className="row1">
            <div
              className="singlefeature"
              onMouseEnter={handleHover1}
              onMouseLeave={handleHover1}
            >
              <img src={feature1} className="featureimg" alt="" />
              <p className="featuretext">AUTOMATIC CHOREOGRAPHY GENERATOR</p>
              <div
                className={`featureblob ${isHovered1 ? "hovered" : ""}`}
              ></div>
            </div>
            <div
              className="singlefeature"
              onMouseEnter={handleHover2}
              onMouseLeave={handleHover2}
            >
              <img src={feature2} className="featureimg" alt="" />
              <p className="featuretext">VIEW CHOREOGRAPHED PROJECT IN 3D</p>
              <div
                className={`featureblob ${isHovered2 ? "hovered" : ""}`}
              ></div>
            </div>
            <div
              className="singlefeature"
              onMouseEnter={handleHover3}
              onMouseLeave={handleHover3}
            >
              <img src={feature3} className="featureimg" alt="" />
              <p className="featuretext">SAVE CHOREOGRAPHED MODEL IN YOUR ACCOUNT</p>
              <div
                className={`featureblob ${isHovered3 ? "hovered" : ""}`}
              ></div>
            </div>
            </div>
            <div className="row2">
            <div
              className="singlefeature"
              onMouseEnter={handleHover4}
              onMouseLeave={handleHover4}
            >
              <img src={feature4} className="featureimg" alt="" />
              <p className="featuretext">PRACTICE THE CHOREOGRAPHY USING OUR MOBILE APP</p>
              <div
                className={`featureblob ${isHovered4 ? "hovered" : ""}`}
              ></div>
            </div>
            <div
              className="singlefeature"
              onMouseEnter={handleHover5}
              onMouseLeave={handleHover5}
            >
              <img src={feature5} className="featureimg" alt="" />
              <p className="featuretext">GET MATCHING RATIO AND MAKE BETTER CORRECTIONS</p>
              <div
                className={`featureblob ${isHovered5 ? "hovered" : ""}`}
              ></div>
            </div>
            <div
              className="singlefeature"
              onMouseEnter={handleHover6}
              onMouseLeave={handleHover6}
            >
              <img src={feature6} className="featureimg" alt="" />
              <p className="featuretext">DOWNLOAD REPORT AND GET SUGGESTIONS</p>
              <div
                className={`featureblob ${isHovered6 ? "hovered" : ""}`}
              ></div>
            </div>
            </div>
          </div>
        </div>
      </section>
      <section className="android-app-section">
        <div className="android-app-top">
          <p className="downloadapp">
            DOWNLOAD<br></br>ANDROID APP
          </p>
          <img src={googleplay} alt="" onClick={()=>window.location.href='https://play.google.com/store/apps/details?id=co.zanie.nataraj'} className="googleplayimg" />
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
