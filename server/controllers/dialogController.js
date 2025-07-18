const Dialog = require('../models/Dialog');
const Message = require('../models/Message');

// Create a new dialog
exports.createDialog = async (req, res) => {
  try {
    const { participant } = req.body;
    const creator = req.user.id;

    if (!participant) {
      return res.status(400).json({ message: 'Участник диалога обязателен' });
    }

    const existingDialog = await Dialog.findOne({
      participants: { $all: [creator, participant] },
    });

    if (existingDialog) {
      return res.status(200).json(existingDialog);
    }

    const newDialog = new Dialog({
      participants: [creator, participant],
    });

    const savedDialog = await newDialog.save();
    res.status(201).json(savedDialog);
  } catch (error) {
    console.error('Error creating dialog:', error);
    res.status(500).json({ message: 'Ошибка при создании диалога' });
  }
};

// Get user dialogs
exports.getDialogs = async (req, res) => {
  try {
    const dialogs = await Dialog.find({ participants: req.user.id })
      .populate('participants', 'name email');
    res.status(200).json(dialogs);
  } catch (error) {
    console.error('Error fetching dialogs:', error);
    res.status(500).json({ message: 'Ошибка при получении диалогов' });
  }
};

// Get messages by dialog ID
exports.getMessagesByDialog = async (req, res) => {
  try {
    const dialogId = req.params.dialogId;
    const dialog = await Dialog.findById(dialogId);

    if (!dialog) {
      return res.status(404).json({ message: 'Диалог не найден' });
    }

    if (!dialog.participants.includes(req.user.id)) {
      return res.status(403).json({ message: 'Нет доступа к диалогу' });
    }

    const messages = await Message.find({ dialog: dialogId })
      .sort({ createdAt: 1 })
      .populate('sender', 'name email');
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Ошибка при получении сообщений' });
  }
};
