import classes from './logo.module.css'

function Logo() {
    return (
        <div className={classes.logoFont}>
            Signally
            <div className={classes.dot}></div>
        </div>
    )
}

export default Logo