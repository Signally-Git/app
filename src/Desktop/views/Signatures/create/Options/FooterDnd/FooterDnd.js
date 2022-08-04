import React, { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { SortableItem } from "Desktop/views/Signatures/create/Options/FooterDnd/SortItem";
import { Item } from "Desktop/views/Signatures/create/Options/FooterDnd/Item";

export default function FooterDnd(props) {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(props.data.footer.items);
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
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => (
          <SortableItem key={id} id={id} setData={props.setData} />
        ))}
      </SortableContext>
      <DragOverlay>{activeId ? <Item id={activeId} setData={props.setData} /> : null}</DragOverlay>
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

        props.setData({ ...props.data, footer: { ...props.data.footer, items: arrayMove(items, oldIndex, newIndex) } })
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }
}
