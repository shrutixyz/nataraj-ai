import Footer from "../../../features/footer/Footer";
import GradientButton from "../../../features/gradientbutton/GradientButton";
import Nav from "../../../features/nav/Nav";
import SocialButton from "../../../features/socialbutton/SocialButton";
import Styles from "./Login.module.css"

const Login = () =>{
    return (
        <>
        <Nav/>
        <div className={Styles.mainbody}>
            <h1 className={Styles.title}>LOGIN</h1>
            <a href="/signup" className={Styles.subtitleref}>TRYING FOR FIRST TIME? SIGNUP</a>
            <p className={Styles.options}>LOGIN OPTIONS</p>
            <div className={Styles.sociallogins}>
                <SocialButton title="Login with Google" width="25" height="4" service="google"/>
                <SocialButton title="Login with Google" width="25" height="4" service="github"/>
            </div>
            <p className={Styles.options}>EMAIL LOGIN</p>
            <input type="text" placeholder="EMAIL ADDRESS" />
            <br />
            <input type="password" placeholder="PASSWORD" />
            <br /><br /><br />
            <GradientButton title="SIGNUP" height="4" width="25"/>
        </div>
        <Footer/>
        </>
    )
}

export default Login;