import classes from './logo.module.css'

function Logo({...props }) {
return (
        <div className={classes.logoFont} {...props}>
            S<span className={classes.i}>i</span>gnally
            <div className={classes.dot}></div>
        </div>
    )
}

export default Logo