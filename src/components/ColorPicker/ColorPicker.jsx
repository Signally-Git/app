import { HexColorInput, HexColorPicker } from "react-colorful";
import { useState, useRef, useEffect, cloneElement } from "react";
import classes from "./colorPicker.module.css";

const ColorPicker = ({ color, onColorChange, children }) => {
    const [isPickerVisible, setPickerVisibility] = useState(false);
    const colorPickerRef = useRef(null);

    const toggleColorPicker = () => {
        setPickerVisibility(!isPickerVisible);
    };

    const handleColorChange = (newColor) => {
        onColorChange(newColor);
    };

    const handleClickOutside = (event) => {
        if (
            colorPickerRef.current &&
            !colorPickerRef.current.contains(event.target)
        ) {
            setPickerVisibility(false);
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={colorPickerRef} className={classes.container}>
            {cloneElement(children, { onClick: toggleColorPicker })}
            {isPickerVisible && (
                <div className={classes.colorPicker}>
                    <HexColorPicker
                        color={color}
                        onChange={handleColorChange}
                    />
                    <HexColorInput
                        prefixed
                        color={color}
                        onChange={handleColorChange}
                    />
                </div>
            )}
        </div>
    );
};

export default ColorPicker;
