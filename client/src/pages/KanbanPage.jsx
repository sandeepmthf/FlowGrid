import React, { useEffect, useState } from 'react';
import { useProjects } from '../context/ProjectContext';
import { useTasks } from '../context/TaskContext';
import KanbanBoard from '../components/KanbanBoard';
import TaskModal from '../components/TaskModal';
import { 
  Filter, 
  Plus, 
  FolderPlus, 
  ClipboardList, 
  XCircle,
  Briefcase
} from 'lucide-react';
import ProjectModal from '../components/ProjectModal';

const KanbanPage = () => {
  const { projects, currentProject, selectProject } = useProjects();
  const { tasks, loading, filters, setFilters, fetchTasks } = useTasks();
  
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Sync tasks when selected project changes
  useEffect(() => {
    if (currentProject) {
      fetchTasks(currentProject._id, filters.search, filters.priority, filters.status);
    }
  }, [currentProject, fetchTasks, filters.priority, filters.status]);

  const handlePriorityFilter = (e) => {
    const val = e.target.value;
    setFilters(prev => ({ ...prev, priority: val }));
    fetchTasks(currentProject?._id || '', filters.search, val, filters.status);
  };

  const handleResetFilters = () => {
    setFilters({ search: '', priority: '', status: '' });
    fetchTasks(currentProject?._id || '', '', '', '');
  };

  // If no projects exist in workspace
  if (projects.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm max-w-xl mx-auto space-y-5 my-12">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto">
          <Briefcase className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-bold font-display text-slate-800">No Projects Available</h4>
          <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
            You need to create a project container before you can organize tasks on the Kanban board.
          </p>
        </div>
        <button
          onClick={() => setIsProjectModalOpen(true)}
          className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-100 transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          <FolderPlus className="w-4 h-4" />
          <span>Create Project</span>
        </button>

        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filtering header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase tracking-wider pr-2">
            <Filter className="w-3.5 h-3.5 text-slate-300" />
            <span>Filters</span>
          </div>

          {/* Project switch fallback dropdown */}
          <select
            value={currentProject?._id || ''}
            onChange={(e) => {
              const matched = projects.find(p => p._id === e.target.value);
              if (matched) selectProject(matched);
            }}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
          >
            {projects.map(p => (
              <option key={p._id} value={p._id}>{p.title}</option>
            ))}
          </select>

          {/* Priority filter */}
          <select
            value={filters.priority}
            onChange={handlePriorityFilter}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          {/* Reset Filters */}
          {(filters.search || filters.priority) && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Add task button */}
        {currentProject && (
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-100 transition-all cursor-pointer justify-center"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        )}
      </div>

      {/* Board render */}
      {loading && tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase animate-pulse">Syncing board tasks...</p>
        </div>
      ) : currentProject ? (
        <KanbanBoard tasks={tasks} />
      ) : null}

      {/* Task Creation Modal */}
      {currentProject && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
        />
      )}
    </div>
  );
};

export default KanbanPage;
