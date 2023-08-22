import { CustomisableInput } from "./CustomisableInput";
import classes from "./details.module.css";
import React, { useState } from "react";
import { CustomSelect, FontSizeRange } from "components";

const Details = () => {
    const [fontSize, setFontSize] = useState([8]);
    return (
        <div className={classes.container}>
            <div className={classes.inputsContainer}>
                <h4>User</h4>
                <div>
                    <CustomisableInput defaultValue={"First name"} isVisible />
                    <CustomisableInput defaultValue={"Last name"} isVisible />
                    <CustomisableInput defaultValue={"Position"} isVisible />
                    <CustomisableInput defaultValue={"Email"} isVisible />
                    <CustomisableInput defaultValue={"Mobile"} isVisible />
                </div>

                <h4>Organisation</h4>
                <div>
                    <CustomisableInput defaultValue={"Phone"} isVisible />
                    <CustomisableInput defaultValue={"Street"} isVisible />
                    <CustomisableInput defaultValue={"Zip code"} isVisible />
                    <CustomisableInput defaultValue={"City"} isVisible />
                    <CustomisableInput defaultValue={"Country"} isVisible />
                    <CustomisableInput
                        defaultValue={"Organisation name"}
                        isVisible
                    />
                </div>
                <h4>Workplace</h4>
                <div>
                    <CustomisableInput defaultValue={"Phone"} isVisible />
                    <CustomisableInput defaultValue={"Street"} isVisible />
                    <CustomisableInput defaultValue={"Zip code"} isVisible />
                    <CustomisableInput defaultValue={"City"} isVisible />
                    <CustomisableInput defaultValue={"Country"} isVisible />
                    <CustomisableInput
                        defaultValue={"Workplace name"}
                        isVisible
                    />
                </div>
            </div>
            <hr />
            <h4>
                Font size{" "}
                <span className={classes.fontSize}>- {fontSize}px</span>
            </h4>

            <FontSizeRange fontSize={fontSize} setFontSize={setFontSize} />
            <CustomSelect
                styleList={{ height: "21.5rem" }}
                getValue={"name"}
                defaultValue={"Arial"}
                display={"name"}
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
