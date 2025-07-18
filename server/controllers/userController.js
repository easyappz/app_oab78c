const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, status },
      { new: true, select: '-password' }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search users
exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.query || '';
    if (!query) {
      return res.json({ users: [] });
    }

    const searchCriteria = {
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
      ],
      _id: { $ne: req.user.id },
    };

    const users = await User.find(searchCriteria)
      .select('-password')
      .limit(20);
    res.json({ users });
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add friend
exports.addFriend = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user.id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'User is already your friend' });
    }

    user.friends.push(friendId);
    await user.save();

    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    console.error('Error adding friend:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
