import { useState } from 'react'
import { GrCheckmark } from 'react-icons/gr'
import Input from 'Utils/Input/input'
import classes from './customselect.module.css'

export default function CustomSelect({ items, multiple, defaultValue }) {
    const [value, setValue] = useState([])

    return (
        <>
            <div className={classes.container}>
                <Input type="text" disabled value={value.toString()} />
                <form onChange={(e) => multiple ? e.target.checked ? setValue([...value, e.target.value]) : setValue(value.filter((val) => val !== e.target.value)) : setValue([e.target.value])}>
                <ul className={classes.list}>
                    {items.map((item) => {
                        return <li className={classes.element}>
                            <input name="item" id={item['@id']} value={item.name} type={multiple ? "checkbox" : "radio"} />
                            <GrCheckmark className={classes.checkmark} />
                            {item.name}
                        </li>
                    })}
                </ul>
                </form>
            </div>
        </>
    )
}