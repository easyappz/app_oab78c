const Message = require('../models/Message');
const Dialog = require('../models/Dialog');

// Send a new message
exports.sendMessage = async (req, res) => {
  try {
    const { dialogId, content } = req.body;
    const userId = req.user._id;

    if (!dialogId || !content) {
      return res.status(400).json({ message: 'Dialog ID and message content are required' });
    }

    const dialog = await Dialog.findById(dialogId);

    if (!dialog) {
      return res.status(404).json({ message: 'Dialog not found' });
    }

    const isParticipant = dialog.participants.some(participant => participant.toString() === userId.toString());

    if (!isParticipant) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const message = new Message({
      dialogId,
      sender: userId,
      content
    });

    await message.save();

    dialog.lastMessage = message._id;
    dialog.updatedAt = Date.now();
    await dialog.save();

    const populatedMessage = await Message.findById(message._id).populate('sender', 'name avatar');

    res.status(201).json({
      ...populatedMessage.toObject(),
      isOwn: true
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
