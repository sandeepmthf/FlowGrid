import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { 
  User, 
  Mail, 
  Calendar, 
  CheckSquare, 
  Clock, 
  Activity, 
  Bookmark 
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Aggregate user-specific assignments
  const myTasks = tasks.filter(
    (t) => t.assignedTo?._id === user?._id || t.assignedTo === user?._id
  );
  const myCompleted = myTasks.filter((t) => t.status === 'Done').length;
  const myPending = myTasks.length - myCompleted;

  const joinDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Unknown Date';

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile summary card */}
      <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute top-[-40%] right-[-5%] w-72 h-72 rounded-full bg-slate-50 pointer-events-none" />
        <img
          src={user?.avatar || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.name}`}
          alt={user?.name}
          className="w-24 h-24 rounded-3xl bg-slate-100 border border-slate-200 shadow-md relative z-10 flex-shrink-0"
        />
        <div className="text-center sm:text-left space-y-2 relative z-10 flex-1">
          <h3 className="text-2xl font-black font-display text-slate-800 leading-tight">
            {user?.name}
          </h3>
          <p className="text-sm font-semibold text-slate-400">Workspace User Profile</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-slate-400 font-bold">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-300" />
              {user?.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-300" />
              Member since {joinDate}
            </span>
          </div>
        </div>
      </div>

      {/* Task analytics summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">My Assigned Tasks</p>
            <h4 className="text-2xl font-black text-slate-800">{myTasks.length}</h4>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl">
            <Bookmark className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">My Completed Items</p>
            <h4 className="text-2xl font-black text-slate-800">{myCompleted}</h4>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">My Pending Action Items</p>
            <h4 className="text-2xl font-black text-slate-800">{myPending}</h4>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Workload list */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
        <div>
          <h4 className="font-bold font-display text-slate-800 tracking-wide">My Workload Agenda</h4>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Tasks currently assigned to you</p>
        </div>

        <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto pr-2">
          {myTasks.map((t) => (
            <div key={t._id} className="py-3 flex items-center justify-between gap-4 text-xs font-semibold">
              <div className="min-w-0 flex-1">
                <p className="text-slate-800 font-bold truncate">{t.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{t.projectId?.title || 'FlowGrid Project'}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase ${
                  t.priority === 'High' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                  t.priority === 'Low' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                  'bg-amber-50 text-amber-600 border border-amber-100'
                }`}>
                  {t.priority}
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold tracking-wider uppercase ${
                  t.status === 'Done' ? 'bg-emerald-50 text-emerald-700' :
                  t.status === 'In Progress' ? 'bg-indigo-50 text-indigo-700' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {t.status}
                </span>
              </div>
            </div>
          ))}

          {myTasks.length === 0 && (
            <div className="py-8 text-center text-slate-400 flex flex-col items-center gap-2">
              <Activity className="w-8 h-8 text-slate-300" />
              <p className="text-xs">No tasks currently assigned to you.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
