import StylesGreen from "./ButtonCustomGreen.module.css"
import StylesRed from "./ButtonCustomRed.module.css"

const ButtonCustom = (props: any) =>{
    return (
        <button className={props.color==="red"?StylesRed.button2:StylesGreen.button2} onClick={props.onClick} style={{"height": `${props.height}rem`, "width": `${props.width}rem`, "fontSize": `${props.fontsize?props.fontsize: "1"}rem`}}>
            <span className={props.color==="red"?StylesRed.span:StylesGreen.span}>{props.title}</span>
        </button>
    )
}

export default ButtonCustom;