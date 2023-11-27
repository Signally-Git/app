import React from "react";
import classes from "./addons.module.css";
import GroupedAddonsRenderer from "./GroupedAddonsRenderer";

const Addons = ({ styles, setStyles }) => {
    return (
        <div className={classes.container}>
            <div className={classes.inputsContainer}>
                <GroupedAddonsRenderer
                    styles={styles}
                    setStyles={setStyles}
                    filter={[
                        "greetings",
                        "disclaimers",
                        "user.urlagenda",
                        "customfield_1",
                        "customfield_2",
                        "customfield_3",
                    ]}
                />
            </div>
            <hr />
        </div>
    );
};

export { Addons };
