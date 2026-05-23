import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  KanbanSquare, 
  User2, 
  LogOut, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const { projects, currentProject, selectProject } = useProjects();

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: '/projects', label: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
    { to: '/kanban', label: 'Kanban Board', icon: <KanbanSquare className="w-5 h-5" /> },
    { to: '/profile', label: 'My Profile', icon: <User2 className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen border-r border-slate-800 flex-shrink-0">
      {/* Brand logo header */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-800/60">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-black text-lg tracking-wider">
          F
        </div>
        <div>
          <h1 className="text-lg font-bold text-white font-display leading-tight tracking-wide">FlowGrid</h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-500" /> Active Workspace
          </p>
        </div>
      </div>

      {/* Project Switcher section */}
      {projects.length > 0 && (
        <div className="px-4 py-4 border-b border-slate-800/40">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2 px-2">Project context</label>
          <select
            value={currentProject?._id || ''}
            onChange={(e) => {
              const matched = projects.find(p => p._id === e.target.value);
              if (matched) selectProject(matched);
            }}
            className="w-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl focus:outline-none transition-all cursor-pointer"
          >
            {projects.map(p => (
              <option key={p._id} value={p._id} className="bg-slate-950 text-slate-200">{p.title}</option>
            ))}
          </select>
        </div>
      )}

      {/* Main navigation list */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                  : 'hover:bg-slate-800/50 hover:text-slate-100'
              }`
            }
          >
            <div className="flex items-center gap-3">
              {link.icon}
              <span>{link.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-slate-500" />
          </NavLink>
        ))}
      </nav>

      {/* Logged in User Profile Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/20 flex flex-col gap-3">
        {user && (
          <div className="flex items-center gap-3 px-2">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
              alt={user.name}
              className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-800"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white truncate leading-none">{user.name}</p>
              <p className="text-[11px] text-slate-500 truncate mt-1">{user.email}</p>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-400 text-xs font-semibold tracking-wider transition-all text-slate-400 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>SIGN OUT</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
