import {DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';

export default function Socials() {
    return (
        <DndContext>
        <Draggable />
        <Droppable />
      </DndContext>
    )
} 