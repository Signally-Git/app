import classes from './input.module.css'
import { useState } from "react"
import { HexColorInput, HexColorPicker } from "react-colorful";
import { IoTextOutline } from "react-icons/io5";

function Input(props) {
    const [option, setOption] = useState("")

    return (
        <div className={classes.container}><div className={classes.inputColorSize}>
            <input
                disabled={props.disabled}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
                onClick={() => setOption("")}
            />
            <div className={classes.inputOptions}>
                <IoTextOutline
                    size="1.35rem"
                    color="#ff7954"
                    onClick={() => setOption(option === "text" ? "" : "text")}
                />
                <div
                    className={classes.colorPreview}
                    style={{ background: props.color }}
                    onClick={() =>
                        setOption(option === "color" ? "" : "color")
                    }
                ></div>
            </div>
        </div>
            <div className={classes.optionsContainer}>
                {option === "color" ? (
                    <>
                        <div className={`${classes.optionContainer} ${classes.colorContainer}`}>
                            <HexColorInput
                                className={classes.input}
                                color={props.color}
                                onChange={props.setColor}
                            />
                            <HexColorPicker
                                className={classes.colorPick}
                                color={props.color}
                                onChange={props.setColor}
                            />{" "}
                        </div>
                    </>
                ) : (
                    option === "text" && (
                        <> <div className={classes.optionContainer}>
                            <ul className={classes.textStyle}>
                                <li><input type="checkbox" /><span style={{fontWeight: "bolder"}}>B</span></li>
                                <li><input type="checkbox" /><span style={{fontStyle: "italic"}}>I</span></li>
                                <li><input type="checkbox" /><span style={{textDecoration: "underline"}}>U</span></li>
                            </ul>
                        </div>
                        </>
                    )
                )}
            </div>
        </div>
    )
}

export default Input