import React from "react";
import { CustomCheckbox } from "components";
import classes from "./deploy.module.css";

const EntityList = ({ items, selectedItems, onCheckboxChange, entityType }) => {
    if (!items) return null;
    return (
        <div className={classes.scrollableList}>
            {items.map((item) => (
                <div key={item.id} className={classes.checkboxContainer}>
                    <CustomCheckbox
                        id={`entity-${item.id}`}
                        checked={selectedItems.has(item.id)}
                        onChange={(e) =>
                            onCheckboxChange(item.id, e.target.checked, entityType)
                        }
                        label={
                            item.name || `${item.firstName} ${item.lastName}`
                        }
                    />
                    <label htmlFor={`entity-${item.id}`}>
                        {item.name || `${item.firstName} ${item.lastName}`}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default EntityList;
