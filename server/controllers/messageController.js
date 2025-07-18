const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { dialogId, content } = req.body;
    const sender = req.user.id;

    if (!dialogId || !content) {
      return res.status(400).json({ message: 'Диалог и содержание сообщения обязательны' });
    }

    const newMessage = new Message({
      dialog: dialogId,
      sender,
      content,
    });

    const savedMessage = await newMessage.save();
    await savedMessage.populate('sender', 'name email');
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Ошибка при отправке сообщения' });
  }
};
