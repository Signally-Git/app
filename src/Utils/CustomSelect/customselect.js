import classes from './customselect.module.css'

export default function CustomSelect({items}) {
    return (
        <>
        <div className={classes.container}>
        <div>
            {items.map((item) => {
                return <div>{item}</div>
            })}
        </div>
        </div>
        </>
    )
}