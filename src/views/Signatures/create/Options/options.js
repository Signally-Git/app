import classes from "./options.module.css";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { Range } from "react-range";
import { useEffect, useRef, useState } from "react";
import { CustomSelect } from "components";
import { FormattedMessage } from "react-intl";
import Eye from "components/EyeDropper/EyeDropper";

// Options tab
// Contains : the closing formula
// Adds a banner in the predetermined slot of the template
// Styles socials networks icons with color, order and visibility
// Spacing
// Eco-responsability message, disclaimer & more

export default function Options(props) {
    const [colorSelect, setColorSelect] = useState();
    // const [selectColor, setSelectColor] = useState(false)
    const color = useRef(null);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (color.current && !color.current.contains(event.target)) {
                setColorSelect("");
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [color]);

    const handleBackground = () => {
        if (colorSelect === "bg")
            return (
                <>
                    <div
                        ref={color}
                        className={`${classes.optionContainer} ${classes.colorContainer}`}
                    >
                        <HexColorInput
                            autoFocus
                            className={classes.input}
                            color={props?.data?.bgColor}
                            onChange={(e) =>
                                props.setData({
                                    ...props.data,
                                    bgColor: e,
                                })
                            }
                        />
                        <HexColorPicker
                            name="color"
                            className={classes.colorPick}
                            color={props?.data?.bgColor}
                            onChange={(e) =>
                                props.setData({
                                    ...props.data,
                                    bgColor: e,
                                })
                            }
                        />{" "}
                    </div>
                </>
            );
    };
    useEffect(() => {
        props.setData({
            ...props.data,
            event: {
                ...props.data?.event,
                display: props?.data?.event?.list[0]?.imageUrl,
            },
        });
    }, [props?.display?.event?.enabled, props?.display?.event?.padding]);
    return (
        <>
            <div className={classes.container}>
                {/* Header */}
                <div className={classes.row}>
                    <label htmlFor="salutation">
                        <h4>
                            <FormattedMessage id="greetings" />
                        </h4>
                    </label>
                    <label className={classes.switch}>
                        <input
                            type="checkbox"
                            autoFocus
                            id="salutation"
                            checked={props.data?.salutation?.enabled}
                            onChange={(e) => {
                                props.setData({
                                    ...props.data,
                                    salutation: {
                                        ...props.data?.salutation,
                                        enabled: e.target.checked,
                                    },
                                });
                            }}
                        />
                        <span
                            className={`${classes.slider} ${classes.round}`}
                        ></span>
                    </label>
                </div>
                {/* Salutation */}
                <div className={classes.checkToText}>
                    {props.data?.salutation?.enabled ? (
                        <>
                            <input
                                type="text"
                                autoFocus
                                onChange={(e) => {
                                    props.setData({
                                        ...props.data,
                                        salutation: {
                                            ...props?.data?.salutation,
                                            value: e.target.value,
                                        },
                                    });
                                }}
                                defaultValue={props?.data?.salutation.value}
                            />
                            <div className={classes.spacing}>
                                <FormattedMessage
                                    id="signature.options.spacing"
                                    tagName="h6"
                                />
                                <Range
                                    step={2}
                                    min={0}
                                    max={50}
                                    values={[props?.data?.salutation.padding]}
                                    onChange={(range) =>
                                        props.setData({
                                            ...props.data,
                                            salutation: {
                                                ...props?.data?.salutation,
                                                padding: range,
                                            },
                                        })
                                    }
                                    renderTrack={({ props, children }) => (
                                        <div
                                            className={classes.rangeSlider}
                                            {...props}
                                            style={{
                                                ...props.style,
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
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </div>

                {/* Bonus changeable elements of the template */}
                <div className={classes.custom}>
                    <div className={classes.row}>
                        <label htmlFor="custom">
                            <h4>
                                <FormattedMessage id="custom" />
                            </h4>
                        </label>
                        <label className={classes.switch}>
                            <input
                                type="checkbox"
                                autoFocus
                                id="custom"
                                checked={props?.data?.custom?.enabled}
                                onChange={(e) => {
                                    props.setData({
                                        ...props.data,
                                        custom: {
                                            ...props?.data?.custom,
                                            enabled: e.target.checked,
                                        },
                                    });
                                }}
                            />
                            <span
                                className={`${classes.slider} ${classes.round}`}
                            ></span>
                        </label>
                    </div>
                    {/* Change to align */}
                    <div className={classes.optionsContainer}>
                        {handleBackground()}
                    </div>
                    {props?.data?.custom?.enabled ? (
                        <div
                            className={classes.inputStyle}
                            style={{ width: "10rem", marginRight: "auto" }}
                        >
                            <span>
                                <FormattedMessage id="signature.options.background_color" />
                            </span>
                            <Eye />
                            <div
                                title="Background color"
                                style={{
                                    backgroundColor: props?.data?.bgColor,
                                }}
                                className={classes.colorPreview}
                                onClick={() =>
                                    colorSelect !== "bg"
                                        ? setColorSelect("bg")
                                        : setColorSelect("")
                                }
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>

                {/* Event */}
                <div className={classes.checkToText}>
                    <div className={classes.row}>
                        <label htmlFor="event">
                            <h4>
                                <FormattedMessage id="event" />
                            </h4>
                        </label>
                        <label className={classes.switch}>
                            <input
                                type="checkbox"
                                autoFocus
                                id="event"
                                checked={props?.data?.event?.enabled}
                                onChange={(e) => {
                                    props.setData({
                                        ...props.data,
                                        event: {
                                            ...props?.data?.event,
                                            enabled: e.target.checked,
                                        },
                                    });
                                }}
                            />
                            <span
                                className={`${classes.slider} ${classes.round}`}
                            ></span>
                        </label>
                    </div>
                    {props?.data?.event?.enabled &&
                    props?.data?.event.list?.length > 0 ? (
                        <>
                            <CustomSelect
                                onChange={(e) =>
                                    props.setData({
                                        ...props.data,
                                        event: {
                                            ...props?.data?.event,
                                            display: e,
                                            selected: e,
                                        },
                                    })
                                }
                                items={props?.data?.event.list}
                                getValue={"imageUrl"}
                                display={"name"}
                            />
                            {/* <form onChange={(e) => props.setData({ ...props.data, event: { ...props?.data?.event, display: `${process.env.REACT_APP_API_URL}${JSON.parse(e.target.value).imageUrl}`, selected: JSON.parse(e.target.value) } })}>
                                <select defaultValue={JSON.stringify(props?.data?.event.selected)}>
                                    {props?.data?.event.list.map((event) => {
                                        return <option key={event.id} value={JSON.stringify(event)}>{event.name}</option>
                                    })}
                                </select>
                            </form> */}
                        </>
                    ) : (
                        ""
                    )}
                    <div className={classes.spacing}>
                        <h6>
                            <FormattedMessage id="signature.options.spacing" />
                        </h6>
                        <Range
                            step={2}
                            min={0}
                            max={50}
                            values={[props?.data?.event.padding]}
                            onChange={(range) =>
                                props.setData({
                                    ...props.data,
                                    event: {
                                        ...props?.data?.event,
                                        padding: range,
                                        display:
                                            props?.data?.event?.selected
                                                .imageUrl,
                                    },
                                })
                            }
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    className={classes.rangeSlider}
                                    style={{
                                        ...props.style,
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
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Socials */}
                <div className={classes.row}>
                    <label htmlFor="socials">
                        <h4>
                            <FormattedMessage id="socials.title" />
                        </h4>
                    </label>
                    <label className={classes.switch}>
                        <input
                            type="checkbox"
                            autoFocus
                            id="socials"
                            checked={props?.data?.socials?.enabled}
                            onChange={(e) => {
                                props.setData({
                                    ...props.data,
                                    socials: {
                                        ...props?.data?.socials,
                                        enabled: e.target.checked,
                                    },
                                });
                            }}
                        />
                        <span
                            className={`${classes.slider} ${classes.round}`}
                        ></span>
                    </label>
                </div>

                {/* vCard */}
                <div className={classes.row}>
                    <label htmlFor="vcard">
                        <h4>
                            <FormattedMessage id="vcard" />
                        </h4>
                    </label>
                    <label className={classes.switch}>
                        <input
                            type="checkbox"
                            autoFocus
                            id="vcard"
                            checked={props?.data?.vcard?.enabled}
                            onChange={(e) => {
                                props.setData({
                                    ...props.data,
                                    vcard: {
                                        ...props?.data?.vcard,
                                        enabled: e.target.checked,
                                    },
                                });
                            }}
                        />
                        <span
                            className={`${classes.slider} ${classes.round}`}
                        ></span>
                    </label>
                </div>

                {/* Calendar */}
                <div className={classes.row}>
                    <label htmlFor="calendar">
                        <h4>
                            <FormattedMessage id="calendar" />
                        </h4>
                    </label>
                    <label className={classes.switch}>
                        <input
                            type="checkbox"
                            autoFocus
                            id="calendar"
                            checked={props?.data?.calendar?.enabled}
                            onChange={(e) => {
                                props.setData({
                                    ...props.data,
                                    calendar: {
                                        ...props?.data?.calendar,
                                        enabled: e.target.checked,
                                    },
                                });
                            }}
                        />
                        <span
                            className={`${classes.slider} ${classes.round}`}
                        ></span>
                    </label>
                </div>

                {/* Disclaimer */}
                <div className={classes.row}>
                    <label htmlFor="footer">
                        <h4>
                            <FormattedMessage id="disclaimer" />
                        </h4>
                    </label>
                    <label className={classes.switch}>
                        <input
                            type="checkbox"
                            autoFocus
                            id="footer"
                            checked={props?.data?.footer?.enabled}
                            onChange={(e) => {
                                props.setData({
                                    ...props.data,
                                    footer: {
                                        ...props?.data?.footer,
                                        enabled: e.target.checked,
                                    },
                                });
                            }}
                        />
                        <span
                            className={`${classes.slider} ${classes.round}`}
                        ></span>
                    </label>
                </div>
                <div className={classes.checkToText}>
                    {props?.data?.footer?.enabled ? (
                        <>
                            <textarea
                                className={classes.textArea}
                                autoFocus
                                onChange={(e) => {
                                    props.setData({
                                        ...props.data,
                                        footer: {
                                            ...props?.data?.footer,
                                            value: e.target.value,
                                        },
                                    });
                                }}
                                defaultValue={props?.data?.footer.value}
                            />
                            <div className={classes.footerColor}>
                                <h6>
                                    <FormattedMessage id="color" />
                                </h6>
                                <button
                                    className={classes.colorPreview}
                                    onClick={() =>
                                        colorSelect !== "footer"
                                            ? setColorSelect("footer")
                                            : setColorSelect("")
                                    }
                                    style={{
                                        background: props?.data?.footer.color,
                                    }}
                                />
                            </div>
                            {colorSelect === "footer" && (
                                <>
                                    <div
                                        className={`${classes.optionContainer} ${classes.colorContainer}`}
                                        ref={color}
                                    >
                                        <HexColorInput
                                            className={classes.input}
                                            color={props?.data?.footer.color}
                                            onChange={(e) =>
                                                props.setData({
                                                    ...props.data,
                                                    footer: {
                                                        ...props?.data?.footer,
                                                        color: e,
                                                    },
                                                })
                                            }
                                        />
                                        <HexColorPicker
                                            className={classes.colorPick}
                                            color={props?.data?.footer.color}
                                            onChange={(e) =>
                                                props.setData({
                                                    ...props.data,
                                                    footer: {
                                                        ...props?.data?.footer,
                                                        color: e,
                                                    },
                                                })
                                            }
                                        />{" "}
                                    </div>
                                </>
                            )}
                            <div className={classes.size}>
                                <h6>
                                    <FormattedMessage id="size" /> (
                                    {props?.data?.footer.fontSize}px)
                                </h6>
                                <Range
                                    step={1}
                                    min={7}
                                    max={22}
                                    values={[props?.data?.footer.fontSize]}
                                    onChange={(size) =>
                                        props.setData({
                                            ...props.data,
                                            footer: {
                                                ...props?.data?.footer,
                                                fontSize: size,
                                            },
                                        })
                                    }
                                    renderTrack={({ props, children }) => (
                                        <div
                                            className={classes.rangeSlider}
                                            {...props}
                                            style={{
                                                ...props.style,
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
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <div className={classes.spacing}>
                                <h6>
                                    <FormattedMessage id="signature.options.spacing" />
                                </h6>
                                <Range
                                    step={2}
                                    min={0}
                                    max={50}
                                    values={[props?.data?.footer.padding]}
                                    onChange={(range) =>
                                        props.setData({
                                            ...props.data,
                                            footer: {
                                                ...props?.data?.footer,
                                                padding: range,
                                            },
                                        })
                                    }
                                    renderTrack={({ props, children }) => (
                                        <div
                                            className={classes.rangeSlider}
                                            {...props}
                                            style={{
                                                ...props.style,
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
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}
