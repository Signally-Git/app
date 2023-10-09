import React from "react";
import { FormattedMessage } from "react-intl";
import BrandStyleComponent from "./BrandStyleComponent";

const BrandStyleCategory = ({
    category,
    styles,
    handleRangeChange,
    handleUpdateStyle,
}) => {
    return (
        <div>
            <FormattedMessage
                id={`white_label_page.categories.${category}`}
                tagName="h2"
            />
            {styles.map((style) => (
                <BrandStyleComponent
                    key={style.property}
                    style={style}
                    handleRangeChange={handleRangeChange}
                    handleUpdateStyle={handleUpdateStyle}
                />
            ))}
        </div>
    );
};

export default BrandStyleCategory;
