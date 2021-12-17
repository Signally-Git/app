import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Item } from "./Item";

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    margin: 5,
  };

  return <Item ref={setNodeRef} style={style} content={props.id} fill={props.fill} background={props.background} {...attributes} {...listeners} />;
}
