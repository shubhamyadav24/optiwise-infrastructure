const Project = require('../models/Project');

// GET /api/projects  (public) - supports ?category= & ?featured=true
const getProjects = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.featured === 'true') filter.featured = true;

    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Could not load projects.' });
  }
};

// GET /api/projects/:id (public)
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found.' });
    res.json(project);
  } catch (err) {
    res.status(404).json({ message: 'Project not found.' });
  }
};

// POST /api/projects (admin only)
const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Could not create project.' });
  }
};

// PUT /api/projects/:id (admin only)
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!project) return res.status(404).json({ message: 'Project not found.' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Could not update project.' });
  }
};

// DELETE /api/projects/:id (admin only)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found.' });
    res.json({ message: 'Project deleted.' });
  } catch (err) {
    res.status(400).json({ message: 'Could not delete project.' });
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };
