const Programmer = require("../models/Programmers");

const index = async (req, res) => {
  try {
    const programmers = await Programmer.find();
    res.json(programmers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const programmers = await Programmer.findById(id);
    if (!programmers) {
      return res.status(404).json({ error: 'Programmer not found' });
    }
    res.json(programmers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const store = async (req, res) => {
  try {
    const { body } = req;
    const { title } = body;

    const hasProgrammer = await Programmer.findOne({ title });
    if (hasProgrammer) {
      return res.status(400).json({ error: 'Duplicated programmers' });
    }

    const programmers = await Programmer.create(body);
    res.status(200).json(programmers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const update = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const programmers = await Programmer.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!programmers) {
      return res.status(404).json({ error: 'Programmer not found' });
    }

    res.json(programmers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await Programmer.findByIdAndDelete(id);
    } catch (e) {
      res.status(404).json({ error: 'Programmer can not be deleted' });
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
