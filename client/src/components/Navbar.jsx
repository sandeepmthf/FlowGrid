import React, { useState } from 'react';
import { Search, Plus, CheckCircle, Bell } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { useProjects } from '../context/ProjectContext';
import TaskModal from './TaskModal';

const Navbar = ({ title }) => {
  const { filters, setFilters, fetchTasks } = useTasks();
  const { currentProject } = useProjects();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, search: value }));
    // Trigger task search query on active project
    fetchTasks(currentProject?._id || '', value, filters.priority, filters.status);
  };

  return (
  <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0 z-10 soft-card">
      {/* Page Title / Project context breadcrumbs */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold font-display text-slate-800 tracking-wide">
          {title}
        </h2>
        {currentProject && title !== currentProject.title && (
          <div className="flex items-center gap-1 text-xs font-semibold">
            <span className="text-slate-300">/</span>
            <span className="text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              {currentProject.title}
            </span>
          </div>
        )}
      </div>

      {/* Center Actions / Global Search */}
      <div className="flex items-center gap-6">
        <div className="relative w-64">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search tasks or people..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-2xc pl-9 pr-4 py-2 text-sm font-medium text-slate-700 transition-all"
          />
        </div>

        {/* Create Task Button */}
        {currentProject && (
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xc text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-100 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        )}

        {/* Task Creation Modal */}
        {currentProject && (
          <TaskModal
            isOpen={isTaskModalOpen}
            onClose={() => setIsTaskModalOpen(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
