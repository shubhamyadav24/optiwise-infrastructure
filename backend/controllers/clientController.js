const Client = require('../models/Client');

// GET /api/clients (public)
const getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 }).populate('project', 'title');
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Could not load clients.' });
  }
};

// POST /api/clients (admin only)
const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Could not add client.' });
  }
};

// PUT /api/clients/:id (admin only)
const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!client) return res.status(404).json({ message: 'Client not found.' });
    res.json(client);
  } catch (err) {
    res.status(400).json({ message: err.message || 'Could not update client.' });
  }
};

// DELETE /api/clients/:id (admin only)
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found.' });
    res.json({ message: 'Client deleted.' });
  } catch (err) {
    res.status(400).json({ message: 'Could not delete client.' });
  }
};

module.exports = { getClients, createClient, updateClient, deleteClient };
