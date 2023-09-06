import React from "react";
import { CustomisableInput } from "./CustomisableInput";

const GroupedAddonsRenderer = ({
    styles,
    setStyles,

    ignoreCategories = [],
    ignoreSubcategories = [],
}) => {
    const updateStyleProperty = (styleUpdate) => {
        const updatedStyles = styles.map((style) =>
            style.id === styleUpdate.id
                ? { ...style, value: styleUpdate.value }
                : style
        );
    if (!styles) return null;

    const matchesPattern = (str, pattern) => {
        const escapeRegExp = (string) =>
            string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const patternRegExp = new RegExp(
            `^${pattern.split("*").map(escapeRegExp).join(".*")}$`
        );
        return patternRegExp.test(str);
    };

    const shouldIgnore = (str, ignoreList) => {
        return ignoreList.some((pattern) => matchesPattern(str, pattern));
    };

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
            const combinedPath = path.concat(key).join(".");

            if (
                shouldIgnore(key, ignoreCategories) ||
                shouldIgnore(combinedPath, ignoreSubcategories)
            ) {
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
                    <div key={combinedPath}>
                        <CustomisableInput
                            defaultValue={key}
                            isVisible={value.enabled}
                            fontWeight={value.fontWeight}
                            fontStyle={value.fontStyle}
                            textDecoration={value.textDecoration}
                            fontColor={value.color}
                            onColorChange={(newColor) =>
                                updateStyleProperty(newColor)
                            }
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
                        />
                    </div>
                );
            }
            return acc;
        }, []);
    };

    const groupedStyles = recursivelyGroupStyles(styles);

    return <>{renderGroupedStyles(groupedStyles)}</>;
};

export default GroupedAddonsRenderer;
