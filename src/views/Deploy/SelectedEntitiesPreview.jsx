import React from 'react';

const SelectedEntitiesPreview = ({ selectedEntities, entities, entityType }) => {
    const entitiesPreview = Array.from(selectedEntities).map(id => {
        const entity = entities.find(e => e.id === id);
    console.log(entity, entityType)
        if (entityType === 'Users' && entity) {
            return `${entity.firstName || ''} ${entity.lastName || ''}`.trim();
        }
        return entity?.name;
    }).join(", ");

    if (!entitiesPreview) return null;

    return (
        <li>
            <b>{entityType}:</b> {entitiesPreview}
        </li>
    );
};

export default SelectedEntitiesPreview;
