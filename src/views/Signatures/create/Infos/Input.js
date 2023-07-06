import classes from "./input.module.css";
import { useState, useRef, useEffect } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { IoTextOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";

// Individual input with font style selection and color picker
// Updating directly the value

function Input(props) {
    // Takes current states and updates it

    const [option, setOption] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    // Styles weight, underline and italic or not
    const handleFontStyle = (e) => {
        let style;
        const name = Object.getOwnPropertyNames(JSON.parse(e.target.value));
        const defaultStyle = props.defaultStyle;

        if (e.target.checked)
            style = { ...defaultStyle, ...JSON.parse(e.target.value) };
        else {
            delete defaultStyle[name];
            style = defaultStyle;
        }
        props.setContent({
            ...props.content,
            [props.toChange]: {
                ...props.content[props.toChange],
                style: style,
            },
        });
    };

    // Closes option
    const color = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (color.current && !color.current.contains(event.target)) {
                setOption("");
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [color]);

    const handleClose = (e) => {
        if (e.target.type === "checkbox") return null;
        if (option === "text") e.preventDefault();
        setOption("");
    };

    return (
        <div className={classes.container}>
            <div className={classes.inputColorSize}>
                <input
                    disabled={props.disabled}
                    type={props.type}
                    placeholder={props.placeholder}
                    defaultValue={props.value}
                    onChange={(e) =>
                        props.setContent({
                            ...props.content,
                            [props.toChange]: {
                                ...props.content[props.toChange],
                                value: e.target.value,
                            },
                        })
                    }
                    onClick={() => setOption("")}
                />
                <div
                    className={`${classes.inputOptions} ${
                        option === "text" ? classes.opened : ""
                    }`}
                >
                    <IoTextOutline
                        size="1.35rem"
                        onClick={() =>
                            setOption(option === "text" ? "" : "text")
                        }
                    />
                    <div
                        className={classes.colorPreview}
                        style={{
                            background: props.content[props.toChange].color,
                        }}
                        onClick={() =>
                            setOption(option === "color" ? "" : "color")
                        }
                    ></div>
                </div>
            </div>
            <div className={classes.optionsContainer}>
                {option === "color" ? (
                    <>
                        <div
                            className={`${classes.optionContainer} ${classes.colorContainer}`}
                            ref={color}
                        >
                            <HexColorInput
                                className={classes.input}
                                color={props.content[props.toChange].color}
                                onChange={(e) =>
                                    props.setContent({
                                        ...props.content,
                                        [props.toChange]: {
                                            ...props.content[props.toChange],
                                            color: e,
                                        },
                                    })
                                }
                            />
                            <HexColorPicker
                                className={classes.colorPick}
                                color={props.content[props.toChange].color}
                                onChange={(e) =>
                                    props.setContent({
                                        ...props.content,
                                        [props.toChange]: {
                                            ...props.content[props.toChange],
                                            color: e,
                                        },
                                    })
                                }
                            />{" "}
                        </div>
                    </>
                ) : (
                    option === "text" && (
                        <>
                            {" "}
                            <div className={classes.optionContainer}>
                                <form
                                    onChange={(e) => handleFontStyle(e)}
                                    onSubmit={(e) => handleClose(e)}
                                >
                                    <ul className={classes.textStyle}>
                                        <li>
                                            <input
                                                type="checkbox"
                                                defaultChecked={
                                                    props.defaultStyle
                                                        .fontWeight === "bold"
                                                }
                                                value={JSON.stringify({
                                                    fontWeight: "bold",
                                                })}
                                            />
                                            <span
                                                style={{ fontWeight: "bold" }}
                                            >
                                                B
                                            </span>
                                        </li>
                                        <li>
                                            <input
                                                type="checkbox"
                                                defaultChecked={
                                                    props.defaultStyle
                                                        .fontStyle === "italic"
                                                }
                                                value={JSON.stringify({
                                                    fontStyle: "italic",
                                                })}
                                            />
                                            <span
                                                style={{ fontStyle: "italic" }}
                                            >
                                                I
                                            </span>
                                        </li>
                                        <li>
                                            <input
                                                type="checkbox"
                                                defaultChecked={
                                                    props.defaultStyle
                                                        .textDecoration ===
                                                    "underline"
                                                }
                                                value={JSON.stringify({
                                                    textDecoration: "underline",
                                                })}
                                            />
                                            <span
                                                style={{
                                                    textDecoration: "underline",
                                                }}
                                            >
                                                U
                                            </span>
                                        </li>
                                        <li>
                                            <button type="submit">
                                                <AiOutlineClose
                                                    strokeWidth={60}
                                                />
                                            </button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </>
                    )
                )}
            </div>
        </div>
    );
}

export default Input;
