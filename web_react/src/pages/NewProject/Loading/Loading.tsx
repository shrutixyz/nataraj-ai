import Nav from "../../../features/nav/Nav"
import Styles from "./Loading.module.css"

const Loading = () => {
    return (
        <>
            <Nav/>
            <div className={Styles.loadingbody}>
                <p className={Styles.percent}>14%</p>
                <p className={Styles.heading}>CHOREOGRAPHING THE BEST DANCE FOR YOU...</p>
                <p className={Styles.subheading}>STAY HERE OR FIND YOUR PROJECT IN DASHBOARD</p>
            </div>
        </>
    )
}

export default Loading;