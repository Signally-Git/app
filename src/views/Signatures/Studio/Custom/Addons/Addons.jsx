import React, { useEffect, useState } from "react";
import classes from "./addons.module.css";
import GroupedAddonsRenderer from "./GroupedAddonsRenderer";

const Addons = ({ selectedTemplate, styles, setStyles }) => {
    return (
        <div className={classes.container}>
            <div className={classes.inputsContainer}>
                <GroupedAddonsRenderer
                    styles={styles}
                    setStyles={setStyles}
                    ignoreCategories={[]}
                    ignoreSubcategories={[]}
                />
            </div>
            <hr />
        </div>
    );
};

export { Addons };
