import Styles from "./GradientButton.module.css"

const GradientButton = (props: any) =>{
    return (
        <button className={Styles.button2} onClick={props.onClick} style={{"height": `${props.height}rem`, "width": `${props.width}rem`, "fontSize": `${props.fontsize?props.fontsize: "0.7"}rem`}}>
            <span className={Styles.span}>{props.title}</span>
        </button>
    );
}

export default GradientButton;