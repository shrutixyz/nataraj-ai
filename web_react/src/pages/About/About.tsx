import React from "react";
import Nav from "../../features/nav/Nav";
import Styles from "./About.module.css";
import Footer from "../../features/footer/Footer";
import faqimg from "../../assets/faqs.svg";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      <Nav />

      <div className={Styles.info}>
        <h1 className={Styles.title}>About</h1>
        <p className={Styles.subtitle}>
          LEARN MORE ABOUT NATARAJ AI'S AMBITION, AND HOW WE'RE PLANNING TO MOVE
          AHEAD!
        </p>

        <p className={Styles.heading}>
          WE WANNA REVOLUTIONIZE DANCE CHOREOGRAPHY SPACE!{" "}
        </p>
        <p className={Styles.poctext}>
          As a dancer or enthusiast, have you ever found yourself out of ideas
          for new choreography? Say no more! With AI, the possibilities of
          creativity are endless. We proudly present Nataraj AI, a platform to
          revolutionize dance creativity. Named after the god of dance, Nataraj
          allows users to upload or import music, trim the desired section, and
          choose their preferred dance form from the given options. The user's
          request is then sent to the backend, where the song is converted into
          timestamp based lyrics. This data, along with the chosen dance form,
          is fed to Gemini-AI to generate timestamped choreography steps. The
          prompt is fine tuned to get the relevant encoding that we further use
          for rendering the choreography. These steps are then translated to our
          3D model.
          <br></br>
          <br></br>
          Users can view their model dancing from any 3D perspective, solving
          the common problem of learning dance from different angles. The
          created project can be made public or unlisted with a shareable link.
          On the mobile app, users can practice their dance and receive detailed
          reports on their performance. Simply click "practice now" for any
          project, select the perspective, and mount the phone on a stable
          surface, ensuring full visibility. After dancing, users can view a
          report showing how well they matched the choreography. Reports are
          saved locally on the device.
          <br></br>
          <br></br>
          So, this is a gist of what Nataraj is able to do. There are many more
          small features to check for, and the use of Gemini and Google products
          like Firebase, ARCore, Flutter and Google cloud have made the process
          more efficient!
        </p>
      </div>

      <div className={Styles.faqs}>
        <div>
          <img src={faqimg} alt="" />
        </div>
        <div className={Styles.line}></div>
        <div className={Styles.faqtext}>
          <h4 className={Styles.question}>Does Nataraj use AI?</h4>
          <p className={Styles.answer}>
            Yes, AI is at the core of Nataraj, and Gemini APIs help us achieve
            our deliverables.
          </p>
          <h4 className={Styles.question}>Is it free to use?</h4>
          <p className={Styles.answer}>
            Upto 3 projects, yes. More than that, please contact us.
          </p>
          <h4 className={Styles.question}>
            Is your personal data like dance video saved?
          </h4>
          <p className={Styles.answer}>
            No, we don't save your personal media data, it remains on your local
            storage of mobile.
          </p>
          <h4 className={Styles.question}>
            Can you request your user data to be deleted?
          </h4>
          <p className={Styles.answer}>
            All the user data is deleted once the user asks for the deletion of
            their account.
          </p>
        </div>
      </div>

      <div className={Styles.unsure}>
        <div className={Styles.unsureheading}>
          <b>
            <h1>STILL UNSURE?</h1>
          </b>
          <p>HERE ARE SOME CONVINCING LINKS</p>
        </div>
        <div className={Styles.linkparent}>
          <div className={Styles.link1} onClick={() => navigate("/dashboard")}>
            <p>Create your First Project</p>
          </div>
          <div className={Styles.link2} onClick={() => navigate("/tutorials")}>
            <p>Nataraj AI in action</p>
          </div>
          <div className={Styles.link3} onClick={() => navigate("/tutorials")}>
            <p>Learn Tutorials</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
