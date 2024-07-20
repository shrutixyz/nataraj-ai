import Styles from "./ConditonalAccess.module.css";
import logofull from "../../assets/logofull.svg";
import GradientButton from "../../features/gradientbutton/GradientButton";
import { useNavigate } from "react-router-dom";

const ConditionalAccess = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={Styles.logo}>
        <img src={logofull} alt="" />
      </div>
      <div className={Styles.content}>
        <h1 className={Styles.uhoh}>{"UH OH :("}</h1>
        <p className={Styles.logintext}>
          YOU NEED TO BE LOGGED IN TO ACCESS THIS PAGE
        </p>
        <GradientButton
          title="LOGIN NOW"
          width="40"
          height="5"
          onClick={() => navigate("/")}
        />
      </div>
    </>
  );
};

export default ConditionalAccess;
