import React from "react";
import { CustomisableInput } from "./CustomisableInput";

const GroupedStylesRenderer = ({
    styles,
    filter,
    ignoreSubcategories = [],
}) => {
    if (!styles) return null;
    const recursivelyGroupStyles = (styles) => {
        const grouped = {};

        styles.forEach((style) => {
            console.log(style);
            let levels = style.type.split(".");
            let currentLevel = grouped;

            levels.forEach((level, index) => {
                if (!currentLevel[level]) {
                    currentLevel[level] = {};
                }
                if (index === levels.length - 1) {
                    currentLevel[level][style.property] = style.value;
                } else {
                    currentLevel = currentLevel[level];
                }
            });
        });

        return grouped;
    };

    const renderGroupedStyles = (grouped, path = []) => {
        return Object.entries(grouped).reduce((acc, [key, value]) => {
            // Si la sous-catégorie est dans la liste des sous-catégories à ignorer, ne pas la rendre.
            if (ignoreSubcategories.includes(path.concat(key).join("."))) {
                return acc;
            }

            if (
                typeof value === "object" &&
                !(value instanceof Array) &&
                !value.fontWeight
            ) {
                let TitleElement = path.length === 0 ? "h3" : "h4";
                const renderedSubgroup = renderGroupedStyles(
                    value,
                    path.concat(key)
                );
                if (renderedSubgroup.length > 0) {
                    acc.push(
                        <React.Fragment key={key}>
                            <TitleElement>{key}</TitleElement>
                            {renderedSubgroup}
                        </React.Fragment>
                    );
                }
            } else {
                console.log(value);
                acc.push(
                    <div key={path.concat(key).join(".")}>
                        <CustomisableInput
                            defaultValue={key}
                            isVisible={!value.enabled}
                            fontWeight={value.fontWeight}
                            fontColor={value.color}
                        />
                    </div>
                );
            }
            return acc;
        }, []);
    };

    const groupedStyles = recursivelyGroupStyles(styles);

    const filteredGroupedStyles = {};
    filter.forEach((category) => {
        if (groupedStyles[category]) {
            filteredGroupedStyles[category] = groupedStyles[category];
        }
    });

    return <>{renderGroupedStyles(filteredGroupedStyles)}</>;
};

export default GroupedStylesRenderer;
