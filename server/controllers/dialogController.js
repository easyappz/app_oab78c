const Dialog = require('../models/Dialog');
const Message = require('../models/Message');
const User = require('../models/User');

// Create a new dialog
exports.createDialog = async (req, res) => {
  try {
    const { participantId } = req.body;
    const userId = req.user._id;

    if (!participantId) {
      return res.status(400).json({ message: 'Participant ID is required' });
    }

    if (participantId.toString() === userId.toString()) {
      return res.status(400).json({ message: 'Cannot create dialog with yourself' });
    }

    const existingDialog = await Dialog.findOne({
      participants: { $all: [userId, participantId] }
    });

    if (existingDialog) {
      return res.status(200).json(existingDialog);
    }

    const dialog = new Dialog({
      participants: [userId, participantId]
    });

    await dialog.save();

    const populatedDialog = await Dialog.findById(dialog._id).populate('participants');

    res.status(201).json(populatedDialog);
  } catch (error) {
    console.error('Error creating dialog:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all dialogs for the logged-in user
exports.getDialogs = async (req, res) => {
  try {
    const userId = req.user._id;

    const dialogs = await Dialog.find({
      participants: userId
    })
      .populate('participants', 'name avatar')
      .populate('lastMessage')
      .sort({ updatedAt: -1 });

    res.status(200).json(dialogs);
  } catch (error) {
    console.error('Error fetching dialogs:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get messages for a specific dialog
exports.getMessagesByDialog = async (req, res) => {
  try {
    const { dialogId } = req.params;
    const userId = req.user._id;

    const dialog = await Dialog.findById(dialogId).populate('participants', 'name avatar');

    if (!dialog) {
      return res.status(404).json({ message: 'Dialog not found' });
    }

    const isParticipant = dialog.participants.some(participant => participant._id.toString() === userId.toString());

    if (!isParticipant) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const messages = await Message.find({ dialogId })
      .populate('sender', 'name avatar')
      .sort({ createdAt: 1 });

    const messagesWithOwnership = messages.map(message => ({
      ...message.toObject(),
      isOwn: message.sender._id.toString() === userId.toString()
    }));

    res.status(200).json({ dialog, messages: messagesWithOwnership });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a dialog
exports.deleteDialog = async (req, res) => {
  try {
    const { dialogId } = req.params;
    const userId = req.user._id;

    const dialog = await Dialog.findById(dialogId);

    if (!dialog) {
      return res.status(404).json({ message: 'Dialog not found' });
    }

    const isParticipant = dialog.participants.some(participant => participant.toString() === userId.toString());

    if (!isParticipant) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Message.deleteMany({ dialogId });
    await Dialog.findByIdAndDelete(dialogId);

    res.status(200).json({ message: 'Dialog deleted successfully' });
  } catch (error) {
    console.error('Error deleting dialog:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
