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
        Tutorials
        </h1>
        <p className={Styles.subtitle}>
          LET'S LEARN HOW TO USE NATARAJ AI AND GET THE BEST OF OUT IT!
        </p>
      </div>

      <div className={Styles.videos}>
      <p className={Styles.videoheading}>SUPER EASY TO USE, AND THESE TUTORIALS WOULD ONLY MAKE IT EASIER</p>
<div className={Styles.videoss}>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_cZa_7KaQ3c?si=VPra_3EU43OkAokF" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_cZa_7KaQ3c?si=VPra_3EU43OkAokF" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_cZa_7KaQ3c?si=VPra_3EU43OkAokF" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_cZa_7KaQ3c?si=VPra_3EU43OkAokF" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_cZa_7KaQ3c?si=VPra_3EU43OkAokF" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
<iframe width="560" height="315" src="https://www.youtube.com/embed/_cZa_7KaQ3c?si=VPra_3EU43OkAokF" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>


</div>
      </div>
      <Footer/>
    </>
  );
};

export default Tutorials;
