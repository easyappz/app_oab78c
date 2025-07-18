const Message = require('../models/messageModel');
const Dialog = require('../models/dialogModel');

// Send a message in a dialog
const sendMessage = async (req, res) => {
  try {
    const { dialogId, content } = req.body;
    const userId = req.user.id;

    if (!dialogId || !content) {
      return res.status(400).json({ message: 'Dialog ID and content are required' });
    }

    // Check if user is part of the dialog
    const dialog = await Dialog.findOne({
      _id: dialogId,
      participants: userId
    });

    if (!dialog) {
      return res.status(403).json({ message: 'Access denied to this dialog' });
    }

    const message = new Message({
      dialogId,
      sender: userId,
      content
    });

    await message.save();

    // Update dialog's updatedAt timestamp
    await Dialog.findByIdAndUpdate(dialogId, { updatedAt: Date.now() });

    // Populate sender details for response
    await message.populate('sender', 'username email');

    res.status(201).json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  sendMessage
};
