import React from 'react';
import Nav from '../../features/nav/Nav';
import Styles from "./Privacy.module.css";
import Footer from '../../features/footer/Footer';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  return (
    <>
      <Nav />
      <div className={Styles.info}>
        <h1 className={Styles.title}>Privacy Policy</h1>
        <p className={Styles.subtitle}>Learn about the privacy policy of Nataraj AI</p>
        <p className={Styles.heading}>Dated July 28th, 2024</p>
        <p className={Styles.poctext}>
          This Privacy Policy describes how Nataraj AI, a mobile and web application developed by Team Haxk, collects, uses, and discloses your information when you use our services.
          <br /><br />
          <b>Information We Collect</b>
          <br />
          We collect the following information when you use Nataraj AI:
          <br />
          <b>User Data:</b> We collect basic user data such as your name and email address when you create an account.
          <br />
          <b>Music Uploads:</b> You may upload music files to generate choreography. However, we do not store the music content on our servers. The uploaded music is processed temporarily to create choreography and is then discarded.
          <br />
          <b>Lyrics:</b> You may provide lyrics to accompany your uploaded music. We store the lyrics to improve choreography generation.
          <br />
          <b>Crashlytics Data:</b> We use Firebase Crashlytics to collect data about crashes and errors that occur within the app. This data helps us identify and fix bugs to improve the app's stability.
          <br /><br />
          <b>Use of Information</b>
          <br />
          We use the information we collect for the following purposes:
          <br />
          <ul>
            <li>To provide and maintain the Nataraj AI service</li>
            <li>To generate choreography based on your uploaded music and lyrics</li>
            <li>To analyze Crashlytics data to improve the app's stability</li>
            <li>To communicate with you about your account and the service</li>
          </ul>
          <br />
          <b>Sharing of Information</b>
          <br />
          We do not share your personal information with any third parties for advertising purposes. We may share your information with third-party service providers who help us operate and maintain the Nataraj AI service, such as Firebase. These service providers are contractually obligated to keep your information confidential and secure.
          <br /><br />
          <b>Your Choices</b>
          <br />
          You can access, update, or delete your user data at any time by logging into your account and accessing your profile settings. You can also delete your account and all associated data by contacting us at zaniecompany@gmail.com.
          <br /><br />
          <b>Data Retention</b>
          <br />
          We will retain your user data for as long as your account is active or as needed to provide you with the services. We will delete your user data upon deletion of your account, unless applicable law requires us to retain it for a longer period.
          <br /><br />
          <b>Security</b>
          <br />
          We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no internet or electronic storage system is completely secure. We cannot guarantee the security of your information.
          <br /><br />
          <b>Children's Privacy</b>
          <br />
          Nataraj AI is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us at zaniecompany@gmail.com. We will delete any such information upon verification.
          <br /><br />
          <b>Changes to this Privacy Policy</b>
          <br />
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website.
          <br /><br />
          <b>Contact Us</b>
          <br />
          If you have any questions about this Privacy Policy, please contact us at zaniecompany@gmail.com.
          <br /><br />
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;