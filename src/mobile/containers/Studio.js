import Header from '../components/Dashboard/Header/Header'
import classes from '../components/Dashboard/dashboard.module.css'

function Studio() {
    return (
        <div className={classes.desktop}>
            <div className={classes.desktopSubcontainer}>
                <Header page={"studio"} user={JSON.parse(localStorage.getItem('user'))} />
                <div className={classes.mainContent}>
                    <div className={classes.dashboardContainer}>
                        <h1>Signally Studio</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Studio