import classes from './input.module.css'
import { useState } from "react"
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Range } from "react-range";
import { IoTextOutline } from "react-icons/io5";

function Input(props) {
    const [option, setOption] = useState("")
    const [range, setRange] = useState([50]);

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
                        <div className={classes.optionContainer}>
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
                            <select
                                id="fontFamily"
                                className={classes.select}
                                value={props.font}
                                onChange={(e) => props.setFont(e.target.value)}
                            >
                                <option
                                    value={"Arial"}
                                    style={{ fontFamily: "Arial" }}
                                >
                                    Arial
                </option>
                                <option
                                    value={"Arial Black"}
                                    style={{ fontFamily: "Arial Black" }}
                                >
                                    Arial Black
                </option>
                                <option
                                    value={"Comic Sans MS"}
                                    style={{ fontFamily: "Comic Sans MS" }}
                                >
                                    Comic Sans MS
                </option>
                                <option
                                    value={"Courier New"}
                                    style={{ fontFamily: "Courier New" }}
                                >
                                    Courier New
                </option>
                                <option
                                    value={"Georgia"}
                                    style={{ fontFamily: "Georgia" }}
                                >
                                    Georgia
                </option>
                                <option
                                    value={"Impact"}
                                    style={{ fontFamily: "Impact" }}
                                >
                                    Impact
                </option>
                                <option
                                    value={"Lucida Console"}
                                    style={{ fontFamily: "Lucida Console" }}
                                >
                                    Lucida Console
                </option>
                                <option
                                    value={"Lucida sans Unicode"}
                                    style={{ fontFamily: "Lucida sans Unicode" }}
                                >
                                    Lucida sans Unicode
                </option>
                                <option
                                    value={"Palatino Linotype"}
                                    style={{ fontFamily: "Palatino Linotype" }}
                                >
                                    Palatino Linotype
                </option>
                                <option
                                    value={"Tahoma"}
                                    style={{ fontFamily: "Tahoma" }}
                                >
                                    Tahoma
                </option>
                                <option
                                    value={"Times New Roman"}
                                    style={{ fontFamily: "Times New Roman" }}
                                >
                                    Times New Roman
                </option>
                                <option
                                    value={"Trebuchet MS"}
                                    style={{ fontFamily: "Trebuchet MS" }}
                                >
                                    Trebuchet MS
                </option>
                                <option
                                    value={"Verdana"}
                                    style={{ fontFamily: "Verdana" }}
                                >
                                    Verdana
                </option>
                            </select>
                            {/* <span className={`${classes.span} ${classes.or}`}>
                                {range[0] === 0
                                    ? "Petite"
                                    : range[0] === 50
                                        ? "Normale"
                                        : "Grande"}
                            </span> */}
                            {/* <Range
                                step={50}
                                min={0}
                                max={100}
                                values={props.range}
                                onChange={(range) => props.setRange(range)}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: "6px",
                                            width: "50%",
                                            backgroundColor: "#FF795422",
                                            margin: "1rem auto",
                                            borderRadius: "50px"
                                        }}
                                    >
                                        {children}
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            transition: "0.2s",
                                            height: "25px",
                                            width: "25px",
                                            backgroundColor: "#FF7954",
                                            border: "3px solid #FFF",
                                            borderRadius: "50%",
                                            outline: "none",
                                            boxShadow: "1px 1px 3px #FF795488"
                                        }}
                                    />
                                )}
                            /> */}
                            </div>
                        </>
                    )
                )}
            </div>
        </div>
    )
}

export default Input