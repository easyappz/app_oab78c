const express = require('express');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const messageController = require('./controllers/messageController');
const authMiddleware = require('./middleware/authMiddleware');

const router = express.Router();

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// User Routes
router.get('/user/profile', authMiddleware, userController.getProfile);
router.put('/user/profile', authMiddleware, userController.updateProfile);
router.delete('/user/profile', authMiddleware, userController.deleteProfile);
router.get('/user/search', authMiddleware, userController.searchUsers);
router.post('/user/friend', authMiddleware, userController.addFriend);

// Post Routes
router.post('/posts', authMiddleware, postController.createPost);
router.get('/posts', authMiddleware, postController.getPosts);
router.post('/posts/:postId/like', authMiddleware, postController.likePost);

// Message Routes
router.post('/messages', authMiddleware, messageController.sendMessage);
router.get('/messages/:otherUserId', authMiddleware, messageController.getMessages);

// Health Check Routes
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
