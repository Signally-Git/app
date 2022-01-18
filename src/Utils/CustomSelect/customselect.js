import { useEffect, useRef, useState } from 'react'
import { VscTriangleDown } from 'react-icons/vsc'
import Input from 'Utils/Input/input'
import classes from './customselect.module.css'
import { ImCheckmark } from 'react-icons/im'

export default function CustomSelect({ items, display, getValue, multiple, defaultValue, onChange }) {
    const [value, setValue] = useState([defaultValue.name])
    const click = useRef(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (click.current && !click.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [value]);
    
    return (
        <>
            <div ref={click} className={`${classes.container} ${isOpen ? classes.open : ""}`} onClick={(e) => { setIsOpen(!isOpen);}}>
                <div className={classes.inputContainer}>
                <Input type="text" disabled value={value.length > 1 ? `${value.length} évènements` : value.toString()} />
                <VscTriangleDown />
                </div>
                <form onChange={(e) => { onChange(e); multiple ? e.target.checked ? setValue([...value, e.target.value]) : setValue(value.filter((val) => val !== e.target.value)) : setValue([e.target.value]) }}>
                    {isOpen ?
                        <ul className={classes.list}>
                            {items.map((item) => {
                                return <li className={classes.element}>
                                    <input defaultChecked={item[getValue] === value[0] ? true : false} name="item" value={item[getValue]} type={multiple ? "checkbox" : "radio"} />
                                    {item[display]}
                                    <ImCheckmark className={classes.checkmark} />
                                </li>
                            })}
                        </ul> : " "}
                </form>
            </div>
        </>
    )
}