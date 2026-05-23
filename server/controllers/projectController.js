const Project = require('../models/Project');
const Task = require('../models/Task');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  try {
    // Return all projects, populate creator and members
    const projects = await Project.find()
      .populate('createdBy', 'name email avatar')
      .populate('members', 'name email avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Please provide title and description' });
    }

    // Default members list includes the creator
    const membersList = members || [];
    if (!membersList.includes(req.user.id)) {
      membersList.push(req.user.id);
    }

    const project = await Project.create({
      title,
      description,
      createdBy: req.user.id,
      members: membersList,
    });

    const populatedProject = await Project.findById(project._id)
      .populate('createdBy', 'name email avatar')
      .populate('members', 'name email avatar');

    res.status(201).json({
      success: true,
      data: populatedProject,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Update fields
    const { title, description, members } = req.body;
    project.title = title || project.title;
    project.description = description || project.description;
    if (members) {
      project.members = members;
      if (!project.members.includes(project.createdBy.toString())) {
        project.members.push(project.createdBy);
      }
    }

    await project.save();

    const populatedProject = await Project.findById(project._id)
      .populate('createdBy', 'name email avatar')
      .populate('members', 'name email avatar');

    res.status(200).json({
      success: true,
      data: populatedProject,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Optional: Only allow creator to delete project
    // if (project.createdBy.toString() !== req.user.id) {
    //   return res.status(403).json({ success: false, message: 'Not authorized to delete this project' });
    // }

    // Cascade delete: Delete all tasks associated with this project
    await Task.deleteMany({ projectId: req.params.id });

    // Delete the project
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Project and all associated tasks deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
