import React, { useEffect, useState } from "react";
import classes from "./addons.module.css";
import GroupedAddonsRenderer from "./GroupedStylesRenderer";

const Addons = ({ selectedTemplate, styles, setStyles }) => {
    return (
        <div className={classes.container}>
            <div className={classes.inputsContainer}>
                <GroupedAddonsRenderer
                    styles={styles}
                    setStyles={setStyles}
                    ignoreCategories={[
                        "user",
                        "company",
                        "organisation",
                        "U_content_custom_text_*",
                    ]}
                    ignoreSubcategories={[
                        "user.picture",
                        "company.logo",
                        "organisation.logo",
                    ]}
                />
            </div>
            <hr />
        </div>
    );
};

export { Addons };
