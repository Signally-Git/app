import classes from "./fontSizeRange.module.css";
import { Range } from "react-range";
import React from "react";

const FontSizeRange = ({ defaultFontSize, fontSize, setFontSize }) => {
    console.log(fontSize);
    return (
        <Range
            step={1}
            min={defaultFontSize - 5}
            max={defaultFontSize + 15}
            values={fontSize}
            onChange={(size) => setFontSize(size)}
            renderTrack={({ props, children }) => (
                <div {...props} className={classes.range}>
                    {children}
                </div>
            )}
            renderThumb={({ props }) => (
                <div {...props} className={classes.rangeThumb} />
            )}
        />
    );
};

export default FontSizeRange;
