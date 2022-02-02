import { useEffect, useRef, useState } from 'react'
import { VscTriangleDown } from 'react-icons/vsc'
import Input from 'Utils/Input/input'
import classes from './customselect.module.css'
import { ImCheckmark } from 'react-icons/im'

export default function CustomSelect({ items, display, displayinlist, getValue, multiple, defaultValue, onChange, styleList, callback }) {
    const [value, setValue] = useState([defaultValue || items[0]?.[getValue] || items[0][display]])
    const click = useRef(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        function handleClickOutside(event) {
            if (click.current && !click.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [value]);

    return (
        <>
            <div  ref={click} className={`${classes.container} ${isOpen ? classes.open : ""}`} onClick={() => { setIsOpen(!isOpen); }}>
                <div className={classes.inputContainer}>
                    <Input type="text" disabled style={Object?.values(items)?.find((obj) => { return obj[getValue] == value })?.['style']}
                        value={value.length > 1 ?
                            `${value.length} évènements` :
                            Object?.values(items)?.find((obj) => { return obj[getValue] == value })?.[display]} />
                    <VscTriangleDown />
                </div>
                <form style={{maxHeight: styleList?.maxHeight}} onChange={(e) => { onChange(e.target.value); multiple ? e.target.checked ? setValue([...value, e.target.value]) : setValue(value.filter((val) => val !== e.target.value)) : setValue([e.target.value]) }}>
                    {isOpen ?
                        <ul className={classes.list} style={styleList} >
                            {items.map((item, index) => {
                                return <li className={classes.element} key={index} style={{...item?.style}} 
                                onClick={item?.callback ? () => item?.callback(true) : () => {}} >
                                    <input defaultChecked={item[getValue] === value[0] ? true : false} name="item" 
                                    value={item[getValue]} type={multiple ? "checkbox" : "radio"} />
                                    {item[displayinlist] || item[display]}
                                    <ImCheckmark className={classes.checkmark} />
                                </li>
                            })}
                        </ul> : " "}
                </form>
            </div>
        </>
    )
}