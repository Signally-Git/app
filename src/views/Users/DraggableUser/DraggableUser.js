import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { forwardRef } from "react";

export function SortableItem(props) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        margin: 5,
    };

    return (
        <Item
            ref={setNodeRef}
            style={style}
            content={props.id}
            {...attributes}
            {...listeners}
        />
    );
}

export const Item = forwardRef(({ content, id, ...props }, ref) => {
    return (
        <div {...props} ref={ref}>
            <button>{content}</button>
        </div>
    );
});
