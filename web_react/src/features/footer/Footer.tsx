import { useSelector } from "react-redux";
import GradientButton from "../gradientbutton/GradientButton";
import Styles from "./Footer.module.css";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const Footer = () => {
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const emailRegex = /^[\w\.-]+@[\w\d\.-]+\.[a-zA-Z]{2,}$/;

  function isValidEmail(email: string): boolean {
    return emailRegex.test(email);
  }

  const pushData = async () => {
    try {
      const response = await axios.post(
        `${endpoint}/contactus`,
        { email: email, text: text },
        {
          timeout: 10000,
        }
      );
      console.log(response);
      if (response.status == 200) {
        setSuccess(true);
        setMessage("Thanks for contacting us. We'll reach out to you soon!");
      } else if (response.status == 429) {
        setSuccess(false);
        setMessage("Request Failed: Please try again after 60 minutes");
      } else {
        setSuccess(false);
        setMessage("Request Failed: " + response.statusText);
      }
      Swal.fire({
        title: message,
        confirmButtonColor: "#FFBA09",
        confirmButtonText: "okay",
      });
    } catch (error) {
      setSuccess(false);
      if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
        setMessage("Request Failed: Request Timed Out");
      } else {
        console.error(error);
        setMessage("Request Failed: " + error);
      }
      Swal.fire({
        title: message,
        confirmButtonColor: "#FFBA09",
        confirmButtonText: "okay",
      });
    }
  };

  const handleSubmit = async () => {
    if (!isValidEmail(email) || text.length === 0) {
      Swal.fire({
        title: "Please fill the email and text correctly",
        confirmButtonColor: "#FFBA09",
        confirmButtonText: "okay",
      });
    } else {
      await pushData();
    }
  };

  return (
    <div className={Styles.footer}>
      <div className={Styles.footerleft}>
        <h1>GET IN TOUCH</h1>
        <input
          type="text"
          className={Styles.input}
          placeholder="EMAIL ADDRESS"
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <textarea
          name=""
          id=""
          cols={30}
          rows={5}
          className={Styles.inputbig}
          placeholder="TYPE HERE..."
          onChange={(evt) => setText(evt.target.value)}
        ></textarea>
        <GradientButton
          title="SUBMIT"
          height="4"
          width="20"
          onClick={handleSubmit}
        />
      </div>

      <div className={Styles.footerright}>
        <h1>QUICK LINKS</h1>
        <a href="/privacy">PRIVACY POLICY</a>
        <a href="https://ai.google.dev/">GEMINI AI APIS</a>
        <a href="https://developers.google.com/ar">ARCORE</a>
        <a href="https://react.dev/">REACT</a>
        <a href="https://unity.com//">UNITY</a>
        <a href="https://www.mixamo.com/">MIXAMO</a>
        <a href="https://firebase.google.com/">FIREBASE</a>
        <a href="https://flutter.dev/">FLUTTER</a>
        <a href="https://www.python.org/">PYTHON</a>
        <h1>ABOUT DEVELOPERS</h1>
        <a href="https://www.linkedin.com/in/shruti-gupta-b721b01b2/">
          SHRUTI GUPTA
        </a>
        <a href="https://in.linkedin.com/in/aakzsh">AAKASH SHRIVASTAVA</a>
      </div>
    </div>
  );
};

export default Footer;
