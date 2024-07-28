import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../features/buttoncustom/ButtonCustom";
import Nav from "../../features/nav/Nav";
import Styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateUserProfilePhotoURL } from "../../utils/firebase_functions";
import { auth, storage } from "../../utils/firebase";
import Swal from "sweetalert2";
import GradientButton from "../../features/gradientbutton/GradientButton";
import locked from "../../assets/locked.png"

const Profile = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const endpoint = useSelector((state: any) => state.backend.endpoint);
  // const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleFileChange = async (event: any) => {
    setFile(event.target.files[0]);
    if (!event.target.files[0]) {
      console.error("Please select a photo first.");
      return;
    }

    try {
      const storageRef = ref(
        storage,
        `user-profile-pictures/${auth.currentUser?.uid}.png`
      );
      await uploadBytes(storageRef, event.target.files[0]);
      const downloadURL = await getDownloadURL(storageRef);

      updateUserProfilePhotoURL(auth.currentUser, downloadURL);

      setFile(null);
      console.log("Profile picture uploaded successfully!");
      Swal.fire({
        title: "Success!",
        text: "Profile picture uploaded successfully!",
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
      Swal.fire({
        title: "Error!",
        text: "Error uploading photo: " + error,
        confirmButtonColor: "#18191A",
        confirmButtonText: "okay",
      });
    }
  };

  const inputref = useRef<HTMLInputElement>(null);

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
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Account deletion cancelled.");
    }
  };
  const handleClick = () => {
    if (inputref.current) {
      inputref.current.click();
    }
  };
  return (
    <>
      <Nav />
      <p className={Styles.title}>YOUR PROFILE</p>
      <div className={Styles.mainbody}>
        <div style={{"display": "flex", "alignItems": "center", "flexDirection": "column"}}>
          <div className={Styles.left}>
            <div className={Styles.pfpparent}>
              <div className={Styles.pfp}>
                <img
                  src={
                    auth.currentUser?.photoURL ??
                    "https://i.ibb.co/nQhcZSc/pfp.png"
                  }
                  height="100%"
                  width="100%"
                  style={{ borderRadius: "50rem" }}
                  alt=""
                />
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                ref={inputref}
              />
              <GradientButton
              title="Edit Profile Picture"
              height="3"
              width="15"
                onClick={() => {
                  handleClick()
                }}
              />
            </div>
            <p className={Styles.basicdetails}>Name: {auth.currentUser?.displayName}</p>
            <p className={Styles.basicdetails}>Email: {auth.currentUser?.email}</p>
         
          </div>
          <br /><br />
          <ButtonCustom
            title="DELETE ACCOUNT"
            width="25"
            height="4"
            color="red"
            onClick={() => deleteAccount()}
          />
        </div>

        <div className={Styles.line}></div>
        <div className={Styles.right}>
          <div>

          <img src={locked} className={Styles.locked} alt="" />

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
