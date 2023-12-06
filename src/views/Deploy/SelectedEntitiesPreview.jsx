import React from 'react';

const SelectedEntitiesPreview = ({ selectedEntities, entities, entityType }) => {
    const entitiesPreview = Array.from(selectedEntities)
        .map(id => entities.find(entity => entity.id === id)?.name)
        .join(", ");

    if (!entitiesPreview) return null;

    return (
        <li>
            <b>{entityType}:</b> {entitiesPreview}
        </li>
    );
};

export default SelectedEntitiesPreview;
