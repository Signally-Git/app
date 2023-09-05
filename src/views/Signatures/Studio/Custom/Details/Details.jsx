import React, { useEffect, useState } from "react";
import { CustomSelect, FontSizeRange } from "components";
import classes from "./details.module.css";
import GroupedStylesRenderer from "./GroupedStylesRenderer";

const Details = ({ selectedTemplate, styles, setStyles }) => {
    const getInitialFontSize = () => {
        for (let style of selectedTemplate.signatureStyles) {
            if (style.property === "fontSize") {
                return parseInt(style.value);
            }
        }
        return 8;
    };

    const getInitialFontFamily = () => {
        for (let style of styles) {
            if (style.property === "fontFamily") {
                return style.value;
            }
        }
        return "Arial, sans-serif";
    };

    const defaultFontSize = getInitialFontSize();
    const [fontSize, setFontSize] = useState([defaultFontSize]);
    const initialFontFamily = getInitialFontFamily();
    const [fontFamily, setFontFamily] = useState(initialFontFamily);

    useEffect(() => {
        const newStyles = styles.map((style) => {
            if (style.property === "fontSize") {
                return { ...style, value: `${fontSize[0]}px` };
            }
            if (style.property === "fontFamily") {
                return { ...style, value: fontFamily };
            }
            return style;
        });
        setStyles(newStyles);
    }, [fontSize, fontFamily]);

    const handleFontChange = (selectedItem) => {
        setFontFamily(selectedItem);
    };

    return (
        <div className={classes.container}>
            <div className={classes.inputsContainer}>
                <GroupedStylesRenderer
                    styles={styles}
                    setStyles={setStyles}
                    filter={["user", "company", "organisation"]}
                    ignoreSubcategories={[
                        "user.picture",
                        "company.logo",
                        "organisation.logo",
                    ]}
                />
            </div>
            <hr />
            <h4>
                Font size{" "}
                <span className={classes.fontSize}>
                    - {fontSize[0]}px{" "}
                    {fontSize[0] === defaultFontSize && <>(Recommended)</>}
                </span>
            </h4>

            <FontSizeRange
                defaultFontSize={defaultFontSize}
                fontSize={fontSize}
                setFontSize={setFontSize}
            />
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
