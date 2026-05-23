import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';

const TaskContext = createContext(null);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ search: '', priority: '', status: '' });
  const { showToast } = useToast();

  const fetchTasks = useCallback(async (projectId = '', search = '', priority = '', status = '') => {
    setLoading(true);
    try {
      let url = '/api/tasks?';
      if (projectId) url += `projectId=${projectId}&`;
      if (search) url += `search=${encodeURIComponent(search)}&`;
      if (priority) url += `priority=${priority}&`;
      if (status) url += `status=${status}&`;

      const response = await api.get(url);
      if (response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.error('Fetch tasks error', error);
      showToast('Failed to fetch tasks', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const createTask = async (taskData) => {
    try {
      const response = await api.post('/api/tasks', taskData);
      if (response.data.success) {
        setTasks(prev => [response.data.data, ...prev]);
        showToast('Task created successfully!', 'success');
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to create task';
      showToast(msg, 'error');
      return false;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/api/tasks/${id}`, taskData);
      if (response.data.success) {
        setTasks(prev => prev.map(t => t._id === id ? response.data.data : t));
        showToast('Task updated successfully!', 'success');
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update task';
      showToast(msg, 'error');
      return false;
    }
  };

  // Optimistic update for Kanban board drag and drop
  const updateTaskStatus = async (id, newStatus) => {
    // 1. Save original tasks for rollback on failure
    const originalTasks = [...tasks];

    // 2. Perform optimistic update in UI
    setTasks(prev =>
      prev.map(t => (t._id === id ? { ...t, status: newStatus } : t))
    );

    try {
      const response = await api.put(`/api/tasks/${id}`, { status: newStatus });
      if (!response.data.success) {
        // Rollback on failure
        setTasks(originalTasks);
        showToast('Failed to sync card position', 'error');
      }
    } catch (error) {
      // Rollback on network error
      setTasks(originalTasks);
      console.error('Status sync error', error);
      showToast('Failed to sync card position', 'error');
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/api/tasks/${id}`);
      if (response.data.success) {
        setTasks(prev => prev.filter(t => t._id !== id));
        showToast('Task deleted successfully', 'success');
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete task';
      showToast(msg, 'error');
      return false;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        filters,
        setFilters,
        fetchTasks,
        createTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
