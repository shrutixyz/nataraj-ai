import { useSelector } from "react-redux";
import GradientButton from "../gradientbutton/GradientButton";
import Styles from "./Footer.module.css";
import axios from "axios";
import { useState } from "react";

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
      } 
      else if(response.status == 429){
        setSuccess(false);
        setMessage("Request Failed: Please try again after 60 minutes");
      }
      else {
        setSuccess(false);
        setMessage("Request Failed: " + response.statusText);
      }
    } catch (error) {
      setSuccess(false);
      if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
        setMessage("Request Failed: Request Timed Out");
      } else {
        console.error(error);
        setMessage("Request Failed: " + error);
      }
    }
  };

  const handleSubmit = async () => {
    if (!isValidEmail(email) || text.length === 0) {
      alert("Please fill the email and text correctly");
    } else {
      await pushData();
    }
  };

  return (
    <div className={Styles.footer}>
      <div className={Styles.footerleft}>
        <h1>GET IN TOUCH</h1>
        <p
          className={Styles.message}
          style={{
            color: success ? "rgb(127, 255, 113)" : "rgb(255, 109, 101)",
          }}
        >
          {message}
        </p>
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
        <a href="">PRIVACY POLICY</a>
        <a href="">GEMINI AI APIS</a>
        <a href="">ARCORE</a>
        <a href="">REACT</a>
        <a href="">FIREBASE</a>
        <a href="">FLUTTER</a>
        <a href="">PYTHON</a>
        <h1>ABOUT DEVELOPERS</h1>
        <a href="">SHRUTI GUPTA</a>
        <a href="">AAKASH SHRIVASTAVA</a>
      </div>
    </div>
  );
};

export default Footer;
