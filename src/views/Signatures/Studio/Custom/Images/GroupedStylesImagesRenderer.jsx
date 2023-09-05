import React from "react";
import { CustomCheckbox, Input } from "components";
import classes from "./GroupedStylesImagesRenderer.module.css";

const GroupedStylesImagesRenderer = ({
    styles,
    filter,
    ignoreSubcategories = [],
}) => {
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
                        <div className={classes.main} key={key}>
                            <TitleElement>{key}</TitleElement>
                            <div className={classes.child}>
                                {renderedSubgroup}
                            </div>
                        </div>
                    );
                }
            } else {
                if (key === "enabled")
                    acc.push(
                        <React.Fragment key={path.concat(key).join(".")}>
                            <CustomCheckbox defaultChecked={!value} />
                        </React.Fragment>
                    );
                else
                    acc.push(
                        <React.Fragment key={path.concat(key).join(".")}>
                            <Input
                                type="number"
                                min={0}
                                defaultValue={value}
                                placeholder={key}
                            />
                        </React.Fragment>
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

export default GroupedStylesImagesRenderer;
