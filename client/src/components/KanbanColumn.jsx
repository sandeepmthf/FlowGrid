import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Plus, CheckSquare, RefreshCw, ClipboardList } from 'lucide-react';
import KanbanCard from './KanbanCard';
import TaskModal from './TaskModal';

const KanbanColumn = ({ id, title, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const getHeaderIcon = () => {
    switch (id) {
      case 'In Progress':
        return <RefreshCw className="w-4 h-4 text-indigo-500 animate-spin-slow" />;
      case 'Done':
        return <CheckSquare className="w-4 h-4 text-emerald-500" />;
      default:
        return <ClipboardList className="w-4 h-4 text-slate-500" />;
    }
  };

  const getBorderColor = () => {
    if (isOver) return 'border-indigo-400 ring-2 ring-indigo-500/10';
    return 'border-slate-200/60';
  };

  const getHeaderBg = () => {
    switch (id) {
      case 'In Progress':
        return 'bg-indigo-50/50 text-indigo-800';
      case 'Done':
        return 'bg-emerald-50/50 text-emerald-800';
      default:
        return 'bg-slate-100/60 text-slate-700';
    }
  };

  return (
    <div className="flex flex-col flex-1 min-w-[280px] bg-slate-50/50 border border-slate-200/80 rounded-2xl p-4 max-h-[calc(100vh-12rem)] min-h-[500px]">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {getHeaderIcon()}
          <h3 className="text-sm font-bold font-display text-slate-800 uppercase tracking-wide">
            {title}
          </h3>
          <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-bold">
            {tasks.length}
          </span>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-all cursor-pointer"
          title={`Add Task to ${title}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Droppable Card Area */}
      <div
        ref={setNodeRef}
        className={`flex-1 overflow-y-auto flex flex-col gap-3 rounded-xl border border-dashed p-2 transition-all ${getBorderColor()} ${
          isOver ? 'bg-indigo-50/20' : ''
        }`}
      >
        {tasks.map((task) => (
          <KanbanCard key={task._id} task={task} />
        ))}

        {tasks.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400 border border-dashed border-slate-200 rounded-xl bg-white/40">
            <span className="text-[11px] font-semibold tracking-wider uppercase mb-1">No tasks</span>
            <span className="text-[10px] text-slate-400">Drag items here or click "+" to add</span>
          </div>
        )}
      </div>

      {/* Column-specific TaskModal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        defaultStatus={id}
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />
    </div>
  );
};

export default KanbanColumn;
