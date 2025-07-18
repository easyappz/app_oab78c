const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Ошибка при получении профиля' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Ошибка при обновлении профиля' });
  }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    await user.remove();
    res.status(200).json({ message: 'Профиль удален' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Ошибка при удалении профиля' });
  }
};

// Search users
exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Введите поисковый запрос' });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    }).select('name email');

    res.status(200).json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Ошибка при поиске пользователей' });
  }
};

// Add friend
exports.addFriend = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user.id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Пользователь уже в друзьях' });
    }

    user.friends.push(friendId);
    await user.save();

    res.status(200).json({ message: 'Друг добавлен' });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ message: 'Ошибка при добавлении друга' });
  }
};
