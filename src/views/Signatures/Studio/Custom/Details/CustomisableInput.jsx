import { ColorPicker, CustomCheckbox, Input } from "components";
import classes from "./customisableInput.module.css";
import { GrBold, GrClearOption, GrItalic, GrUnderline } from "react-icons/gr";

const CustomisableInput = ({
    defaultValue,
    isVisible = {}, // valeur par défaut
    fontWeight = {},
    fontStyle = {},
    textDecoration = {},
    fontColor = { value: "#000000" }, // set default color to black
    onColorChange,
    onEnableChange,
    onWeightChange,
    onStyleChange,
    onDecorationChange,
}) => {
    return (
        <div className={classes.inputContainer}>
            <CustomCheckbox
                title="Enabled"
                onChange={(e) => {
                    onEnableChange({
                        id: isVisible.id,
                        value: e.target.checked.toString(),
                    });
                }}
                checked={isVisible.value === "true"}
            />
            <div className={classes.inputWithStyles}>
                <Input
                    style={{ padding: ".5rem", margin: "0" }}
                    defaultValue={defaultValue}
                    disabled
                />
                <div className={classes.stylesContainer}>
                    <ColorPicker
                        color={fontColor.value || "#000000"}
                        onColorChange={(e) => {
                            onColorChange({
                                id: fontColor.id,
                                value: e,
                            });
                        }}
                    >
                        <GrClearOption />
                    </ColorPicker>
                    <div className={classes.checkboxContainer}>
                        <input
                            type={"checkbox"}
                            id="fontWeight"
                            checked={fontWeight.value === "bold"}
                            onChange={(e) => {
                                onWeightChange(
                                    e.target.checked
                                        ? { id: fontWeight.id, value: "bold" }
                                        : {
                                              id: fontWeight.id,
                                              value: "normal",
                                          }
                                );
                            }}
                        />
                        <GrBold />
                    </div>
                    <div className={classes.checkboxContainer}>
                        <input
                            type={"checkbox"}
                            checked={fontStyle.value === "italic"}
                            onChange={(e) => {
                                onStyleChange(
                                    e.target.checked
                                        ? { id: fontStyle.id, value: "italic" }
                                        : {
                                              id: fontStyle.id,
                                              value: "normal",
                                          }
                                );
                            }}
                        />
                        <GrItalic />
                    </div>
                    <div className={classes.checkboxContainer}>
                        <input
                            type={"checkbox"}
                            checked={textDecoration.value === "underline"}
                            onChange={(e) => {
                                onDecorationChange(
                                    e.target.checked
                                        ? {
                                              id: textDecoration.id,
                                              value: "underline",
                                          }
                                        : {
                                              id: textDecoration.id,
                                              value: "none",
                                          }
                                );
                            }}
                        />
                        <GrUnderline />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { CustomisableInput };
