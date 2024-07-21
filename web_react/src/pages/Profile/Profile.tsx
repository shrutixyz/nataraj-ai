import ButtonCustom from "../../features/buttoncustom/ButtonCustom";
import Nav from "../../features/nav/Nav";
import Styles from "./Profile.module.css";

const Profile = () => {
  return (
    <>
      <Nav />
      <p className={Styles.title}>YOUR PROFILE</p>
      <div className={Styles.mainbody}>
        <div>
        <div className={Styles.left}>
          <div className={Styles.pfpparent}>
            <div className={Styles.pfp}></div>
            <p>EDIT PROFILE PICTURE</p>
          </div>
          <p>Name: Anvesha</p>
          <p>Email: anvesha@nataraj.ai</p>
        </div>
        <ButtonCustom title="DELETE ACCOUNT" width="25" height="4" color="red"/>
        </div>
        
        <div className={Styles.line}>

        </div>
        <div className={Styles.right}>
            <p className={Styles.savedavatarstext}>SAVED DANCE AVATARS</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
