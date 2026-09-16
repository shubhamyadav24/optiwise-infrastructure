const ContactMessage = require('../models/ContactMessage');

// POST /api/contact (public)
const createMessage = async (req, res) => {
  try {
    const { name, phone, email, service, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone number are required.' });
    }
    const entry = await ContactMessage.create({ name, phone, email, service, message });
    res.status(201).json({ message: 'Thanks! We will get back to you shortly.', entry });
  } catch (err) {
    res.status(400).json({ message: 'Could not send your message. Please try again.' });
  }
};

// GET /api/contact (admin only)
const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Could not load messages.' });
  }
};

// PUT /api/contact/:id/read (admin only)
const markRead = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: 'Message not found.' });
    res.json(msg);
  } catch (err) {
    res.status(400).json({ message: 'Could not update message.' });
  }
};

// DELETE /api/contact/:id (admin only)
const deleteMessage = async (req, res) => {
  try {
    const msg = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found.' });
    res.json({ message: 'Message deleted.' });
  } catch (err) {
    res.status(400).json({ message: 'Could not delete message.' });
  }
};

module.exports = { createMessage, getMessages, markRead, deleteMessage };
