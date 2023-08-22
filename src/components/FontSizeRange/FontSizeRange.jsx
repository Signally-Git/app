import classes from "./fontSizeRange.module.css";
import { Range } from "react-range";
import React from "react";

const FontSizeRange = ({ fontSize, setFontSize }) => {
    return (
        <Range
            step={1}
            min={8}
            max={14}
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
