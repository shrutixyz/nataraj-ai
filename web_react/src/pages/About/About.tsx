import React from 'react'
import Nav from '../../features/nav/Nav'
import Styles from "./About.module.css"
import Footer from '../../features/footer/Footer'
import faqimg from "../../assets/faqs.svg"

const About = () => {
  return (
    <>
    <Nav/>

<div className={Styles.info}>
    <h1 className={Styles.title}>
    ABOUT
    </h1>
    <p className={Styles.subtitle}>LEARN MORE ABOUT NATARAJ AI'S AMBITION, AND HOW WE'RE PLANNING TO MOVE AHEAD!</p>

    <p className={Styles.heading}>WE WANNA REVOLUTIONIZE DANCE CHOREOGRAPHY SPACE! </p>
    <p className={Styles.poctext}>lorem ipsum</p>
</div>

<div className={Styles.faqs}>
    <div><img src={faqimg} alt="" /></div>
    <div className={Styles.line}></div>
    <div className={Styles.faqtext}>
      <h4 className={Styles.question}>Question?</h4>
      <p className={Styles.answer}>answer.</p>
      <h4 className={Styles.question}>Question?</h4>
      <p className={Styles.answer}>answer.</p>
    </div>
</div>

<div className={Styles.unsure}>
    <div className={Styles.unsureheading}>
    <b><h1>STILL UNSURE?</h1></b>
    <p>HERE ARE SOME CONVINCING LINKS</p>
    </div>
    <div className={Styles.linkparent}>
      <div className={Styles.link}>

      </div>
      <div className={Styles.link}>

      </div>
      <div className={Styles.link}>

      </div>
    </div>
</div>

<Footer/>
    </>
  )
}

export default About