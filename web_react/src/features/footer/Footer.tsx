import GradientButton from "../gradientbutton/GradientButton";
import Styles from "./Footer.module.css"

const Footer = () =>{
    return (
        <div className={Styles.footer}>
            <div className={Styles.footerleft}>
                <h1>GET IN TOUCH</h1>
                <input type="text" className={Styles.input} placeholder="EMAIL ADDRESS"/>
                <textarea name="" id="" cols={30} rows={5} className={Styles.inputbig} placeholder="TYPE HERE..."></textarea>
                <GradientButton title="SUBMIT" height="4" width="20"/>
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
    )
}

export default Footer;