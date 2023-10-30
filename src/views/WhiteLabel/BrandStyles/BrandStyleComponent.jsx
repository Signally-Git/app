import React from "react";
import { FormattedMessage } from "react-intl";
import { Input, ColorPicker } from "components";
import { Range } from "react-range";
import classes from "../whiteLabel.module.css";

const BrandStyleComponent = ({
    style,
    handleRangeChange,
    handleUpdateStyle,
}) => {
    const { type, property, value } = style;
    let component;

    switch (type) {
        case "color":
            component = (
                <div className={classes.inputContainer} key={property}>
                    <FormattedMessage
                        id={`white_label_page.styles.${property}`}
                        tagName="label"
                    />
                    <ColorPicker
                        color={value}
                        onColorChange={(newColor) =>
                            handleUpdateStyle(property, newColor)
                        }
                    >
                        <div>
                            <label
                                className={classes.colorPreview}
                                style={{ "--bg-color": value }}
                            >
                                {value}
                            </label>
                        </div>
                    </ColorPicker>
                </div>
            );
            break;
        case "length":
            component = (
                <div className={classes.inputContainer} key={property}>
                    <FormattedMessage
                        id={`white_label_page.styles.${property}`}
                        tagName="label"
                    />
                    <Input
                        type="number"
                        min={0}
                        defaultValue={parseFloat(value)}
                        onChange={(e) =>
                            handleUpdateStyle(property, e.target.value)
                        }
                    />
                </div>
            );
            break;
        case "border":
            component = (
                <div className={classes.inputContainer} key={property}>
                    <FormattedMessage
                        id={`white_label_page.styles.${property}`}
                        tagName="label"
                    />
                    <span>{parseFloat(value)}%</span>
                    <Range
                        step={1}
                        min={0}
                        max={100}
                        values={[parseFloat(value) || value]}
                        onChange={(values) =>
                            handleRangeChange(property, values[0])
                        }
                        renderTrack={({ props, children }) => (
                            <div {...props} className={classes.range}>
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div {...props} className={classes.rangeThumb} />
                        )}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "range-root" })}>
                                <input {...getInputProps()} />
                            </div>
                        )}
                    </Range>
                </div>
            );
            break;
        default:
            component = null;
    }

    return component;
};

export default BrandStyleComponent;
