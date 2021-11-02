import classes from './logo.module.css'

function Logo() {
    return (
        <div className={classes.logoFont}>
            S<span className={classes.i}>i</span>gnally
            <div className={classes.dot}></div>
        </div>
    )
}

export default Logo