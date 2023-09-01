const Project = require("../models/Project");

const index = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const store = async (req, res) => {
  try {
    const { body } = req;
    const { title } = body;

    const hasProject = await Project.findOne({ title });
    if (hasProject) {
      return res.status(400).json({ error: 'Duplicated project' });
    }

    const project = await Project.create(body);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const update = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
