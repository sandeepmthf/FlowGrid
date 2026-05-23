import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  ListTodo, 
  ArrowUpRight,
  Plus, 
  AlertCircle 
} from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import ProjectModal from '../components/ProjectModal';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { projects } = useProjects();
  const { tasks, fetchTasks } = useTasks();
  const { user } = useAuth();
  
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Fetch all tasks for all projects to compute aggregates on boot
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Aggregate numbers
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const pendingTasks = totalTasks - completedTasks;

  // Calculate project-wise task completeness
  const projectStats = projects.map(project => {
    const projTasks = tasks.filter(t => t.projectId?._id === project._id || t.projectId === project._id);
    const total = projTasks.length;
    const done = projTasks.filter(t => t.status === 'Done').length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return {
      ...project,
      total,
      done,
      percent
    };
  }).slice(0, 3); // top 3 active projects

  // Recent activities list: recently created tasks
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const statsCards = [
    {
      title: 'Total Projects',
      value: totalProjects,
      icon: <Briefcase className="w-5 h-5 text-indigo-500" />,
      bg: 'bg-indigo-50/50 border-indigo-100',
      description: 'Active workspaces'
    },
    {
      title: 'Total Tasks',
      value: totalTasks,
      icon: <ListTodo className="w-5 h-5 text-blue-500" />,
      bg: 'bg-blue-50/50 border-blue-100',
      description: 'Items in workspace'
    },
    {
      title: 'Completed Tasks',
      value: completedTasks,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      bg: 'bg-emerald-50/50 border-emerald-100',
      description: 'Tasks marked Done'
    },
    {
      title: 'Pending Tasks',
      value: pendingTasks,
      icon: <Clock className="w-5 h-5 text-amber-500" />,
      bg: 'bg-amber-50/50 border-amber-100',
      description: 'Items to finish'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 to-slate-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
        <div>
          <h2 className="text-2xl font-black font-display tracking-wide">Hello, {user?.name}!</h2>
          <p className="text-indigo-200/80 text-sm mt-1 font-medium max-w-md">
            Welcome to FlowGrid. Here is a summary of your workspace activities and milestones.
          </p>
        </div>
        <button
          onClick={() => setIsProjectModalOpen(true)}
          className="flex items-center gap-1.5 px-5 py-3 rounded-2xl text-xs font-bold text-indigo-950 bg-white hover:bg-slate-100 shadow-lg shadow-white/5 transition-all cursor-pointer flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, i) => (
          <div
            key={i}
            className={`border rounded-2xl p-6 flex items-start justify-between shadow-sm bg-white ${card.bg}`}
          >
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.title}</p>
              <h3 className="text-3xl font-black font-display text-slate-800">{card.value}</h3>
              <p className="text-[11px] font-semibold text-slate-400">{card.description}</p>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main dashboard splits */}
      {totalProjects === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm max-w-xl mx-auto space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold font-display text-slate-800">Your Workspace is Empty</h4>
            <p className="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
              Create your first project to organize tasks, coordinate timelines, and collaborate with your teammates.
            </p>
          </div>
          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-100 transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Project</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project progress overview (Left 2 cols) */}
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <div>
                <h4 className="font-bold font-display text-slate-800 tracking-wide">Workspace Progress</h4>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Top performing active projects</p>
              </div>
              <Link
                to="/projects"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 hover:underline"
              >
                <span>View All Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-5">
              {projectStats.map((proj) => (
                <div key={proj._id} className="p-4 border border-slate-50 hover:border-slate-100 rounded-2xl transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h5 className="font-bold text-sm text-slate-800">{proj.title}</h5>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">{proj.done} of {proj.total} tasks completed</p>
                    </div>
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {proj.percent}% Done
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${proj.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity lists (Right 1 col) */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col space-y-6">
            <div>
              <h4 className="font-bold font-display text-slate-800 tracking-wide">Recent Activity</h4>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Latest actions across all boards</p>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto max-h-[300px] pr-2">
              {recentTasks.map((t) => (
                <div key={t._id} className="flex gap-3 text-xs leading-normal">
                  <div className="flex-shrink-0 mt-0.5">
                    {t.status === 'Done' ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    ) : t.status === 'In Progress' ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 line-clamp-1">{t.title}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-1 font-bold">
                      <span className="uppercase tracking-wider">{t.status}</span>
                      <span>•</span>
                      <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}

              {recentTasks.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
                  <AlertCircle className="w-8 h-8 text-slate-300 mb-2" />
                  <p className="text-xs">No recent actions logged.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Project Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
