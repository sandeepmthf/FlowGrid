import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

const ProjectContext = createContext(null);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/projects');
      if (response.data.success) {
        setProjects(response.data.data);
        // Sync current project if already selected
        if (currentProject) {
          const updated = response.data.data.find(p => p._id === currentProject._id);
          if (updated) {
            setCurrentProject(updated);
          } else {
            setCurrentProject(response.data.data[0] || null);
          }
        } else if (response.data.data.length > 0) {
          // Select first project by default
          setCurrentProject(response.data.data[0]);
        }
      }
    } catch (error) {
      console.error('Fetch projects error', error);
      showToast('Failed to fetch projects', 'error');
    } finally {
      setLoading(false);
    }
  }, [currentProject, showToast]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
    } else {
      setProjects([]);
      setCurrentProject(null);
    }
  }, [isAuthenticated]);

  const selectProject = (project) => {
    setCurrentProject(project);
  };

  const createProject = async (title, description, members) => {
    setLoading(true);
    try {
      const response = await api.post('/api/projects', { title, description, members });
      if (response.data.success) {
        setProjects(prev => [response.data.data, ...prev]);
        if (!currentProject) {
          setCurrentProject(response.data.data);
        }
        showToast('Project created successfully!', 'success');
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to create project';
      showToast(msg, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, title, description, members) => {
    setLoading(true);
    try {
      const response = await api.put(`/api/projects/${id}`, { title, description, members });
      if (response.data.success) {
        setProjects(prev => prev.map(p => p._id === id ? response.data.data : p));
        if (currentProject && currentProject._id === id) {
          setCurrentProject(response.data.data);
        }
        showToast('Project updated successfully!', 'success');
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to update project';
      showToast(msg, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    setLoading(true);
    try {
      const response = await api.delete(`/api/projects/${id}`);
      if (response.data.success) {
        setProjects(prev => prev.filter(p => p._id !== id));
        if (currentProject && currentProject._id === id) {
          const remaining = projects.filter(p => p._id !== id);
          setCurrentProject(remaining[0] || null);
        }
        showToast('Project deleted successfully', 'success');
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete project';
      showToast(msg, 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        loading,
        selectProject,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
