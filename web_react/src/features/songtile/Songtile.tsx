import { useState } from "react";
import Styles from  "./Songtile.module.css"
import tick from "../../assets/check.svg"

const Songtile = (props:any) =>{
    const attributes = [
        `
        Song: NIVIRO - Without You [NCS Release]
        Music provided by NoCopyrightSounds
        Free Download/Stream: http://ncs.io/NWithoutYou
        Watch: http://ncs.lnk.to/NWithoutYouAT/youtube
        `,
        `
        Song: Zushi & Vanko - Underrated [NCS Release]
        Music provided by NoCopyrightSounds
        Free Download/Stream: http://ncs.io/Underrated
        Watch: http://ncs.lnk.to/UnderratedAT/youtube
        `,
        `
        Song: Palm Skies & DEAN - Will You Come [NCS Release]
        Music provided by NoCopyrightSounds
        Free Download/Stream: http://ncs.io/WYC
        Watch: http://ncs.lnk.to/WYCAT/youtube
        `,
        `
        Song: Emdi - Hurts Like This [NCS Release]
        Music provided by NoCopyrightSounds
        Free Download/Stream: http://ncs.io/HurtsLikeThis
        Watch: http://youtu.be/Bs-vvOAWXqs
        `,
        `
        Song: Tobu - Back To You [NCS Release]
        Music provided by NoCopyrightSounds
        Free Download/Stream: http://ncs.io/BackToYou
        Watch: http://youtu.be/
        `
    ]
    const [playing, setPlaying] = useState(false);
    const audio = new Audio(props.data.url)

    const handlePlay  = () =>{
        if(audio.paused){
            audio.play()
        }
        else{
            audio.pause()
        }
    }
    return <>
        <div className={Styles.maindiv} title={attributes[props.index]}>
            <div className={Styles.left}>
            <b><p>{props.index+1}.</p></b>
            <p style={{"opacity": "0.8"}}>{props.data.title}</p>
            </div>

            <div className={Styles.right}>
                {
                  <p onClick={handlePlay}>play/pause</p>
                }
                <img src={tick} alt="" onClick={props.onClick} className={Styles.icons} />
            </div>
        </div>
    </>
}

export default Songtile;