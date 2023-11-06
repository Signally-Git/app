import React, { useEffect, useState } from "react";
import { CustomSelect } from "components";
import classes from "./details.module.css";
import GroupedStylesRenderer from "./GroupedStylesRenderer";

const Details = ({ selectedTemplate, styles, setStyles }) => {
    const getInitialFontFamily = () => {
        if (styles && Array.isArray(styles)) {
            for (let style of styles) {
                if (style?.property === "fontFamily") {
                    return style.value;
                }
            }
        }
        return "Arial, sans-serif";
    };

    const initialFontFamily = getInitialFontFamily();
    const [fontFamily, setFontFamily] = useState(initialFontFamily);

    useEffect(() => {
        const newStyles = styles.map((style) => {
            if (style?.property === "fontFamily") {
                return { ...style, value: fontFamily };
            }
            return style;
        });
        setStyles(newStyles);
    }, [fontFamily]);

    if (!selectedTemplate) return <></>;
    const handleFontChange = (selectedItem) => {
        setFontFamily(selectedItem);
    };
    return (
        <div className={classes.container}>
            <div className={classes.inputsContainer}>
                <GroupedStylesRenderer
                    styles={styles}
                    setStyles={setStyles}
                    filter={["user", "company", "organisation", "address"]}
                    ignoreSubcategories={[
                        "user.picture",
                        "company.logo",
                        "organisation.logo",
                    ]}
                />
            </div>
            <hr />
            <CustomSelect
                styleList={{ height: "21.5rem" }}
                getValue={"name"}
                value={"Arial"}
                display={"name"}
                onChange={handleFontChange} // Add this handler
                items={[
                    {
                        name: "Arial",
                        style: { fontFamily: "Arial, sans-serif" },
                    },
                    {
                        name: "Courier New",
                        style: { fontFamily: "Courier New, monospace" },
                    },
                    {
                        name: "Georgia",
                        style: { fontFamily: "Georgia, serif" },
                    },
                    {
                        name: "Times New Roman",
                        style: { fontFamily: "Times New Roman, serif" },
                    },
                    {
                        name: "Trebuchet MS",
                        style: { fontFamily: "Trebuchet MS, sans-serif" },
                    },
                    {
                        name: "Verdana",
                        style: { fontFamily: "Verdana, sans-serif" },
                    },
                ]}
            />
        </div>
    );
};

export { Details };
