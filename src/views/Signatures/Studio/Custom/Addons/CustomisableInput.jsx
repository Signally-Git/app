import {
    ColorPicker,
    VisibilityToggle,
    Input,
    FontSizeRange,
} from "components";
import classes from "./customisableInput.module.css";
import { GrBold, GrClearOption, GrItalic, GrUnderline } from "react-icons/gr";
import React from "react";

const CustomisableInput = ({
    defaultValue,
    isVisible = {}, // valeur par défaut
    fontWeight = {},
    fontStyle = {},
    textDecoration = {},
    fontSize = {},
    onFontSizeChange,
    fontColor = { value: "#000000" }, // set default color to black
    onColorChange,
    onEnableChange,
    onWeightChange,
    onStyleChange,
    onDecorationChange,
    contentValue,
    onContentValueChange,
}) => {
    const encodeContent = (text) => {
        return text.replace(/\n/g, "<br />");
    };

    const decodeContent = (text) => {
        return text.replace(/<br \/>/g, "\n");
    };

    const parseFontSize = (fontSizeStr) =>
        parseInt(fontSizeStr.replace("px", ""), 10);

    return (
        <div className={classes.inputContainer}>
            <VisibilityToggle
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
                {contentValue !== undefined ? (
                    <>
                        <Input
                            type="textarea"
                            style={{
                                padding: ".5rem",
                                margin: "0",
                                minWidth: "10rem",
                                minHeight: "5rem",
                            }}
                            value={decodeContent(contentValue.value)}
                            onChange={(e) =>
                                onContentValueChange({
                                    id: contentValue.id,
                                    value: encodeContent(e.target.value),
                                })
                            }
                        />
                    </>
                ) : (
                    <Input
                        style={{ padding: ".5rem", margin: "0" }}
                        defaultValue={defaultValue}
                        disabled
                    />
                )}
                <div>
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
                    <div className={classes.fontSizeContainer}>
                        <FontSizeRange
                            defaultFontSize={12}
                            fontSize={[parseFontSize(fontSize.value)]}
                            setFontSize={(size) => {
                                onFontSizeChange({
                                    ...fontSize,
                                    value: `${size[0]}px`,
                                });
                            }}
                        />
                        <span className={classes.fontSize}>
                            {parseFontSize(fontSize.value)}px{" "}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { CustomisableInput };
