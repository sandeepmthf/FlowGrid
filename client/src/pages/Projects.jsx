import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Users, 
  ArrowRight,
  Calendar,
  Layers,
  FolderOpen
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import ProjectModal from '../components/ProjectModal';
import ConfirmModal from '../components/ConfirmModal';
import { Link } from 'react-router-dom';

const Projects = () => {
  const { projects, selectProject, deleteProject } = useProjects();
  const { user: currentUser } = useAuth();
  
  const [search, setSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState(null); // project selected for edit
  const [projectToDelete, setProjectToDelete] = useState(null); // project selected for delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Filter projects by search query
  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    setLoading(true);
    await deleteProject(projectToDelete._id);
    setLoading(false);
    setIsDeleteOpen(false);
    setProjectToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Top search & create bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 rounded-xl pl-9 pr-4 py-2.5 text-xs font-semibold text-slate-700 transition-all shadow-sm"
          />
        </div>

        {/* Create button */}
        <button
          onClick={() => {
            setSelectedProject(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-100 transition-all cursor-pointer w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p) => {
          const isCreator = p.createdBy?._id === currentUser?._id || p.createdBy === currentUser?._id;
          return (
            <div
              key={p._id}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 group relative"
            >
              {/* Card Title & Edit Actions */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold font-display text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
                    {p.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 font-bold">
                    <Calendar className="w-3 h-3 text-slate-300" />
                    <span>Created {new Date(p.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                  <button
                    onClick={() => {
                      setSelectedProject(p);
                      setIsModalOpen(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                    title="Edit Settings"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setProjectToDelete(p);
                      setIsDeleteOpen(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {p.description}
              </p>

              {/* Collaborators row */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-2 overflow-hidden">
                    {p.members?.slice(0, 3).map((m, i) => (
                      <img
                        key={m._id || i}
                        className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-white bg-slate-100"
                        src={m.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${m.name || i}`}
                        alt={m.name}
                        title={m.name}
                      />
                    ))}
                    {p.members?.length > 3 && (
                      <div className="inline-flex items-center justify-center h-6.5 w-6.5 rounded-full bg-slate-100 ring-2 ring-white text-[9px] font-black text-slate-500">
                        +{p.members.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Users className="w-3 h-3 text-slate-300" />
                    {p.members?.length || 0} collaborators
                  </span>
                </div>

                <Link
                  to="/kanban"
                  onClick={() => selectProject(p)}
                  className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-wider"
                >
                  <span>Board</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}

        {filteredProjects.length === 0 && (
          <div className="col-span-full bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center mx-auto">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">No Projects Found</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                No matching projects found. Reset your search or create a new workspace container.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Project details modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
      />

      {/* Project delete confirm */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.title}"? This will permanently delete all associated tasks in this project.`}
        loading={loading}
      />
    </div>
  );
};

export default Projects;
