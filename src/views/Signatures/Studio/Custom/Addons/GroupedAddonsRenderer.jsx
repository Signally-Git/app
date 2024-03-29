import React from "react";
import { CustomisableInput } from "./CustomisableInput";

const GroupedAddonsRenderer = ({
    styles,
    setStyles,
    filter,
    ignoreSubcategories = [],
}) => {
    const updateStyleProperty = (styleUpdate) => {
        const updatedStyles = styles.map((style) =>
            style.id === styleUpdate.id
                ? { ...style, value: styleUpdate.value }
                : style
        );

        setStyles(updatedStyles);
    };

    if (!styles) return null;

    const recursivelyGroupStyles = (styles) => {
        const grouped = {};

        styles.forEach((style) => {
            let levels = style.type.split(".");
            let currentLevel = grouped;

            levels.forEach((level, index) => {
                if (!currentLevel[level]) {
                    currentLevel[level] = {};
                }
                if (index === levels.length - 1) {
                    currentLevel[level][style.property] = {
                        value: style.value,
                        id: style.id,
                    };
                } else {
                    currentLevel = currentLevel[level];
                }
            });
        });

        return grouped;
    };

    const renderGroupedStyles = (grouped, path = []) => {
        return Object.entries(grouped).reduce((acc, [key, value]) => {
            if (ignoreSubcategories.includes(path.concat(key).join("."))) {
                return acc;
            }

            if (
                typeof value === "object" &&
                !(value instanceof Array) &&
                !value.fontWeight
            ) {
                let TitleElement = path.length === 0 ? "h4" : "h3";
                const renderedSubgroup = renderGroupedStyles(
                    value,
                    path.concat(key),
                    key
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
                acc.push(
                    <div
                        className={styles.inputContainer}
                        key={path.concat(key).join(".")}
                    >
                        <h3>{key}</h3>
                        <CustomisableInput
                            defaultValue={key}
                            isVisible={value.enabled}
                            fontWeight={value.fontWeight}
                            fontStyle={value.fontStyle}
                            textDecoration={value.textDecoration}
                            fontColor={value.color}
                            fontSize={value.fontSize}
                            onColorChange={(newColor) =>
                                updateStyleProperty(newColor)
                            }
                            onFontSizeChange={(newSize) => {
                                updateStyleProperty(newSize);
                            }}
                            onEnableChange={(newVisibility) =>
                                updateStyleProperty(newVisibility)
                            }
                            onWeightChange={(newWeight) => {
                                updateStyleProperty(newWeight);
                            }}
                            onStyleChange={(newStyle) =>
                                updateStyleProperty(newStyle)
                            }
                            onDecorationChange={(newDecoration) =>
                                updateStyleProperty(newDecoration)
                            }
                            contentValue={value.htmlContent}
                            onContentValueChange={(newContent) => {
                                updateStyleProperty(newContent);
                            }}
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
        if (category.indexOf(".") > -1) {
            const parent = category.split(".")[0];
            const children = category.split(".")[1];
            if (groupedStyles?.[parent]?.[children])
                filteredGroupedStyles[children] =
                    groupedStyles[parent][children];
        }
        if (groupedStyles[category]) {
            filteredGroupedStyles[category] = groupedStyles[category];
        }
    });

    return <>{renderGroupedStyles(filteredGroupedStyles)}</>;
};

export default GroupedAddonsRenderer;
