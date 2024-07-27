import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../features/buttoncustom/ButtonCustom";
import Nav from "../../features/nav/Nav";
import Styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
// import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateUserProfilePhotoURL } from "../../utils/firebase_functions";
import {auth, storage} from "../../utils/firebase";


const Profile = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  // const dispatch = useDispatch();
  const [file, setFile] = useState(null);



  const handleFileChange = async (event:any) => {
    setFile(event.target.files[0]);
    if (!file) {
      console.error('Please select a photo first.');
      return;
    }

    try {
      const storageRef = ref(storage, `user-profile-pictures/${auth.currentUser?.uid}.png`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      updateUserProfilePhotoURL(auth.currentUser, downloadURL);

      setFile(null); 
      console.log('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/ca");
    }
  }, [isLoggedIn]);

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        const response = await axios.get(
          `${endpoint}/deleteaccount/${auth.currentUser?.uid}`
        );
        console.log(response);
        navigate('/')
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Account deletion cancelled.");
    }
  };
  return (
    <>
      <Nav />
      <p className={Styles.title}>YOUR PROFILE</p>
      <div className={Styles.mainbody}>
        <div>
          <div className={Styles.left}>
            <div className={Styles.pfpparent}>
              <div className={Styles.pfp}>
                <img src={auth.currentUser?.photoURL??"sss"} height={100} width={100} alt="" />
              </div>
              <input type="file" onChange={handleFileChange} placeholder="hehe"/>
              <p>EDIT PROFILE PICTURE</p>
            </div>
            <p>Name: Anvesha</p>
            <p>Email: anvesha@nataraj.ai</p>
          </div>
          <ButtonCustom
            title="DELETE ACCOUNT"
            width="25"
            height="4"
            color="red"
            onClick = {()=>deleteAccount()}
          />
        </div>

        <div className={Styles.line}></div>
        <div className={Styles.right}>
          <p className={Styles.savedavatarstext}>SAVED DANCE AVATARS</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
