import React, { useState } from "react";
import {
    closestCenter,
    DndContext,
    DragOverlay,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "Desktop/views/Signatures/create/Options/SocialsDnd/SortItem";
import { Item } from "Desktop/views/Signatures/create/Options/SocialsDnd/Item";

export default function DndSocials(props) {
    const [activeId, setActiveId] = useState(null);
    const [items, setItems] = useState(props.data.socials.items);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor)
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items}
                strategy={horizontalListSortingStrategy}
            >
                {items.map((id) => (
                    <SortableItem
                        key={id}
                        id={id}
                        fill={props.fill}
                        background={props.background}
                    />
                ))}
            </SortableContext>
            <DragOverlay>
                {activeId ? <Item id={activeId} /> : null}
            </DragOverlay>
        </DndContext>
    );

    function handleDragStart(event) {
        const { active } = event;

        setActiveId(active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id);
                const newIndex = items.indexOf(over.id);

                props.setData({
                    ...props.data,
                    socials: {
                        ...props.data.socials,
                        items: arrayMove(items, oldIndex, newIndex),
                    },
                });
                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }
}
