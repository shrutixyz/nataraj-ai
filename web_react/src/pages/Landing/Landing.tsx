import React from 'react'
import Nav from '../../features/nav/Nav'
import hero from '../../assets/mascot.svg';
import './Landing.css'

const Landing = () => {
  return (
    <>
      <Nav/>
      <section className='hero-section'>
        <div className="left">
          <h1>CREATE</h1>
          <h1>THE <span>BEAT.</span></h1>
          <p>NATARAJ AI IS YOUR ALL IN ONE AI POWERED DANCE CHOREOGRAPHER</p>
          <button>GET STARTED</button>
          <br />
          <br />
          <p id='instructions'>* learn more about the fair use of Artificial Intelligence. <br />
          * learn more about the privacy policy associated with the application.</p>
        </div>
        <div className="right">
          <img src={hero} alt="" />
        </div>
      </section>
    </>
  )
}

export default Landing