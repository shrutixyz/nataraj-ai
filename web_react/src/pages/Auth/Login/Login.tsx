import { useNavigate } from "react-router-dom";
import Footer from "../../../features/footer/Footer";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import SocialButton from "../../../features/socialbutton/SocialButton";
import Styles from "./Login.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  handleEmailSignIn,
  handleGithubSignIn,
  handleGoogleSignIn,
} from "../../../utils/firebase_functions.js";
import { useDispatch } from "react-redux";
import { login } from "../../../store/store";
import Swal from "sweetalert2";
import loader from "../../../assets/loader.svg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn]);

  const googleSignin = async () => {
    setisLoading(true);
    const res = await handleGoogleSignIn(endpoint);
    setisLoading(false);
    if (res !== null) {
      dispatch(login());
      navigate("/dashboard");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Unexpected error occurred! Please try again.",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  };

  const githubSignin = async () => {
    setisLoading(true);
    const res = await handleGithubSignIn(endpoint);
    setisLoading(false);
    if (res !== null) {
      dispatch(login());
      navigate("/dashboard");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Unexpected error occurred! Please try again.",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  };

  const emailSignIn = async (email: String, password: String) => {
    setisLoading(true);
    const res = await handleEmailSignIn(email, password, endpoint);
    setisLoading(false);
    if (res !== null) {
      dispatch(login());
      navigate("/dashboard");
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please fill correct details and then try again",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  };
  return (
    <>
      <Nav />
      {isLoading ? (
        <div className={Styles.loading}>
          <img src={loader} className={Styles.loader} alt="" />
          <p>logging you in</p>
        </div>
      ) : (
        <div className={Styles.mainbody}>
          <h1 className={Styles.title}>LOGIN</h1>
          <a href="/signup" className={Styles.subtitleref}>
            TRYING FOR FIRST TIME? SIGNUP
          </a>
          <p className={Styles.options}>LOGIN OPTIONS</p>
          <div className={Styles.sociallogins}>
            <SocialButton
              title="Login with Google"
              width="25"
              height="4"
              service="google"
              onClick={googleSignin}
            />
            <SocialButton
              title="Login with GitHub"
              width="25"
              height="4"
              service="github"
              onClick={githubSignin}
            />
          </div>
          <p className={Styles.options}>EMAIL LOGIN</p>
          <input
            type="text"
            placeholder="EMAIL ADDRESS"
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="PASSWORD"
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <br />
          <br />
          <br />
          <GradientButton
            title="LOGIN"
            height="4"
            width="25"
            fontsize="1"
            onClick={() => emailSignIn(email, password)}
          />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Login;
