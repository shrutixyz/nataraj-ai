import Footer from "../../../features/footer/Footer";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import SocialButton from "../../../features/socialbutton/SocialButton";
import Styles from "./Register.module.css";

const Onboarding = () => {
  return (
    <>
      <Nav />
      <div className={Styles.mainbody}>
        <h1 className={Styles.title}>ONBOARDING</h1>
        <p  className={Styles.subtitlerefp}>
        JUST THE LAST STEP WE PROMISE
        </p>
        <p className={Styles.options}>BASIC INFORMATION</p>
        <input type="text" placeholder="NAME" />
        <br />
        <br />
        <br />
        <GradientButton title="COMPLETE SIGNUP" height="4" width="25" />
      </div>
      <Footer />
    </>
  );
};

export default Onboarding;
