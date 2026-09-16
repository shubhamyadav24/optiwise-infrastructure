const express = require('express');
const router = express.Router();
const {
  createMessage,
  getMessages,
  markRead,
  deleteMessage
} = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.post('/', createMessage);
router.get('/', protect, getMessages);
router.put('/:id/read', protect, markRead);
router.delete('/:id', protect, deleteMessage);

module.exports = router;
