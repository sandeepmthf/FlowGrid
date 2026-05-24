import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { 
  GripVertical, 
  Calendar, 
  Edit3, 
  Trash2, 
  AlertCircle 
} from 'lucide-react';
import TaskModal from './TaskModal';
import ConfirmModal from './ConfirmModal';
import { useTasks } from '../context/TaskContext';

const KanbanCard = ({ task }) => {
  const { deleteTask } = useTasks();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  const getPriorityColor = (p) => {
    switch (p) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  const formatDueDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dateStr) => {
    if (!dateStr) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateStr) < today;
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteTask(task._id);
    setLoading(false);
    setIsDeleteOpen(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-2xc shadow-sm border border-slate-100 p-4 soft-card transition-all flex flex-col gap-3 group relative"
    >
      {/* Top section: priority and drag handle */}
      <div className="flex items-center justify-between">
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityColor(task.priority)}`}>
          {task.priority} Priority
        </span>
        <div className="flex items-center gap-1">
          {/* Action buttons visible on hover */}
          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1">
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-1 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              title="Edit Task"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              title="Delete Task"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* Drag handle */}
          <div
            {...listeners}
            {...attributes}
            className="p-1 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing rounded-lg hover:bg-slate-50 transition-colors flex-shrink-0"
          >
            <GripVertical className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Task Content */}
      <div className="space-y-1">
        <h4 className="font-bold font-display text-slate-800 text-sm tracking-wide line-clamp-2">
          {task.title}
        </h4>
        {task.description && (
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      {/* Bottom section: assignee avatar & due date */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-1">
        {task.dueDate ? (
          <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${
            isOverdue(task.dueDate) && task.status !== 'Done'
              ? 'text-rose-500 bg-rose-50 px-2 py-0.5 rounded-md' 
              : 'text-slate-400'
          }`}>
            <Calendar className="w-3 h-3" />
            <span>{formatDueDate(task.dueDate)}</span>
            {isOverdue(task.dueDate) && task.status !== 'Done' && (
              <AlertCircle className="w-2.5 h-2.5 text-rose-500 animate-pulse-slow" />
            )}
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 italic font-medium">No due date • consider adding one</div>
        )}

        {/* Assignee Avatar */}
        {task.assignedTo ? (
          <div className="flex items-center gap-1.5" title={`Assigned to ${task.assignedTo.name}`}>
            <img
              src={task.assignedTo.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${task.assignedTo.name}`}
              alt={task.assignedTo.name}
              className="w-6 h-6 rounded-full border border-slate-100 bg-slate-100 flex-shrink-0"
            />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300" title="Unassigned">
            <span className="text-[8px] font-bold">?</span>
          </div>
        )}
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        task={task}
      />

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete the task "${task.title}"?`}
        loading={loading}
      />
    </div>
  );
};

export default KanbanCard;
