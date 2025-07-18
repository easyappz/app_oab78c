const Dialog = require('../models/dialogModel');
const Message = require('../models/messageModel');

// Create a new dialog between two users
const createDialog = async (req, res) => {
  try {
    const { participantId } = req.body;
    const userId = req.user.id;

    if (!participantId) {
      return res.status(400).json({ message: 'Participant ID is required' });
    }

    if (participantId === userId) {
      return res.status(400).json({ message: 'Cannot create dialog with yourself' });
    }

    // Check if dialog already exists
    const existingDialog = await Dialog.findOne({
      participants: { $all: [userId, participantId] }
    });

    if (existingDialog) {
      return res.status(200).json({ dialogId: existingDialog._id });
    }

    // Create new dialog
    const dialog = new Dialog({
      participants: [userId, participantId]
    });

    await dialog.save();
    res.status(201).json({ dialogId: dialog._id });
  } catch (error) {
    console.error('Error creating dialog:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all dialogs for the authenticated user
const getDialogs = async (req, res) => {
  try {
    const userId = req.user.id;

    const dialogs = await Dialog.find({ participants: userId })
      .populate('participants', 'username email')
      .select('participants createdAt updatedAt');

    res.status(200).json(dialogs);
  } catch (error) {
    console.error('Error fetching dialogs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get messages in a specific dialog
const getMessagesByDialog = async (req, res) => {
  try {
    const { dialogId } = req.params;
    const userId = req.user.id;

    // Check if user is part of the dialog
    const dialog = await Dialog.findOne({
      _id: dialogId,
      participants: userId
    });

    if (!dialog) {
      return res.status(403).json({ message: 'Access denied to this dialog' });
    }

    const messages = await Message.find({ dialogId })
      .populate('sender', 'username email')
      .sort({ createdAt: 1 })
      .limit(50);

    // Mark messages as read (except those sent by the current user)
    await Message.updateMany(
      { dialogId, sender: { $ne: userId }, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createDialog,
  getDialogs,
  getMessagesByDialog
};
