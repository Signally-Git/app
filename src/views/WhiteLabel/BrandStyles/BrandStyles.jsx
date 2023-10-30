import React from "react";
import BrandStyleCategory from "./BrandStyleCategory";
import classes from "../whiteLabel.module.css";

const BrandStyles = ({
    categorizedStyles,
    handleRangeChange,
    handleUpdateStyle,
}) => {
    return (
        <div className={classes.inputsContainer}>
            {Object.entries(categorizedStyles).map(([category, styles]) => (
                <BrandStyleCategory
                    key={category}
                    category={category}
                    styles={styles}
                    handleRangeChange={handleRangeChange}
                    handleUpdateStyle={handleUpdateStyle}
                />
            ))}
        </div>
    );
};

export default BrandStyles;
