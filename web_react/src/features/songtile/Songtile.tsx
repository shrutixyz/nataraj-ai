import { useState } from "react";
import Styles from  "./Songtile.module.css"
import play from "../../assets/play.svg"
import pause from "../../assets/pause.svg"
import tick from "../../assets/check.svg"

const Songtile = (props:any) =>{
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
        <div className={Styles.maindiv}>
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