import React from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import { useTasks } from '../context/TaskContext';

const KanbanBoard = ({ tasks }) => {
  const { updateTaskStatus } = useTasks();

  // Configure sensors to allow clicking action buttons without triggering drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Move 8px before drag activates, allowing regular click events
      },
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    let targetStatus = over.id; // Could be "Todo", "In Progress", "Done"

    // If dropped over another card inside a column, find that target card's column
    if (['Todo', 'In Progress', 'Done'].indexOf(targetStatus) === -1) {
      const targetTask = tasks.find(t => t._id === over.id);
      if (targetTask) {
        targetStatus = targetTask.status;
      }
    }

    const activeTask = tasks.find(t => t._id === taskId);
    if (activeTask && activeTask.status !== targetStatus) {
      updateTaskStatus(taskId, targetStatus);
    }
  };

  // Group tasks by their respective status columns
  const todoTasks = tasks.filter((t) => t.status === 'Todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress');
  const doneTasks = tasks.filter((t) => t.status === 'Done');

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col md:flex-row gap-6 items-stretch w-full overflow-x-auto pb-4">
        <KanbanColumn id="Todo" title="To Do" tasks={todoTasks} />
        <KanbanColumn id="In Progress" title="In Progress" tasks={inProgressTasks} />
        <KanbanColumn id="Done" title="Completed" tasks={doneTasks} />
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
