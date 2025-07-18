const User = require('../models/User');

// Get user profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (error) {
    console.error('Ошибка при получении профиля пользователя:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Get current user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (error) {
    console.error('Ошибка при получении профиля:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user);
  } catch (error) {
    console.error('Ошибка при обновлении профиля:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json({ message: 'Профиль успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении профиля:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Search users
exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.q || '';
    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } }
      ]
    }).select('-password').limit(10);
    res.json(users);
  } catch (error) {
    console.error('Ошибка при поиске пользователей:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Add friend
exports.addFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const friendId = req.body.friendId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Пользователь уже в друзьях' });
    }
    user.friends.push(friendId);
    await user.save();
    res.json({ message: 'Друг добавлен' });
  } catch (error) {
    console.error('Ошибка при добавлении друга:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
