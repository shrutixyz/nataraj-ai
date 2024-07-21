import Styles from "./SocialButton.module.css";
import googleicon from "../../assets/googleicon.png"
import githubicon from "../../assets/githubicon.png"

const SocialButton = (props: any) => {
  return (
    <>
      <button
        className={Styles.button2}
        onClick={props.onClick}
        style={{
          height: `${props.height}rem`,
          width: `${props.width}rem`,
          fontSize: `${props.fontsize ? props.fontsize : "1"}rem`,
        }}
      >
        <span className={Styles.span}><img src={props.service=="github"?githubicon:googleicon} height={30} alt="" />{props.title}</span>
      </button>
    </>
  );
};

export default SocialButton;
