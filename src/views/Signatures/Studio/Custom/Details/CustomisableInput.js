import { ColorPicker, CustomCheckbox, Input } from "components";
import classes from "./customisableInput.module.css";
import { useState } from "react";
import { MdOutlineColorLens } from "react-icons/md";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";

const CustomisableInput = ({ defaultValue, isVisible }) => {
    const [color, setColor] = useState("#aabbcc");

    return (
        <div className={classes.inputContainer}>
            <CustomCheckbox title="Enabled" defaultChecked={isVisible} />
            <div className={classes.inputWithStyles}>
                <Input
                    style={{ padding: ".5rem", margin: "0" }}
                    defaultValue={defaultValue}
                    disabled
                />
                <ColorPicker color={color} onColorChange={setColor}>
                    <MdOutlineColorLens className={classes.colorSelector} />
                </ColorPicker>
                <FaBold className={classes.colorSelector} />
                <FaItalic className={classes.colorSelector} />
                <FaUnderline className={classes.colorSelector} />
            </div>
        </div>
    );
};

export { CustomisableInput };
