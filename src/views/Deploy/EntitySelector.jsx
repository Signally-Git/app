import React from "react";
import { CustomCheckbox } from "components";
import EntitySearchInput from "./EntitySearchInput";
import EntityList from "./EntityList";
import classes from "./deploy.module.css";

const EntitySelector = ({
    entityType,
    entities,
    selectedEntities,
    selectAll,
    handleSelectAll,
    handleCheckboxChange,
    searchValue,
    handleSearchChange,
}) => {
    return (
        <div className={classes.column}>
            <div className={classes.header}>
                <h2>
                    <label htmlFor={`selectAll${entityType}`}>
                        {entityType}
                    </label>
                </h2>
                <CustomCheckbox
                    checked={selectAll}
                    id={`selectAll${entityType}`}
                    onChange={(e) =>
                        handleSelectAll(entityType, e.target.checked)
                    }
                />
            </div>
            <EntitySearchInput
                placeholder="Search..."
                value={searchValue}
                onChange={handleSearchChange}
            />
            <EntityList
                items={entities}
                selectedItems={selectedEntities}
                entityType={entityType}
                onCheckboxChange={handleCheckboxChange}
            />
        </div>
    );
};

export default EntitySelector;
