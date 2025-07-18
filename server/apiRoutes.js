const express = require('express');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const messageController = require('./controllers/messageController');
const dialogController = require('./controllers/dialogController');
const authMiddleware = require('./middleware/authMiddleware');
const upload = require('./middleware/uploadMiddleware');

const router = express.Router();

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// User Routes
router.get('/user/profile', authMiddleware, userController.getProfile);
router.get('/user/profile/:userId', authMiddleware, userController.getProfileById);
router.put('/user/profile', authMiddleware, userController.updateProfile);
router.delete('/user/profile', authMiddleware, userController.deleteProfile);
router.get('/user/search', authMiddleware, userController.searchUsers);
router.post('/user/friend', authMiddleware, userController.addFriend);

// Post Routes
router.post('/posts', authMiddleware, upload.single('image'), postController.createPost);
router.get('/posts', authMiddleware, postController.getPosts);
router.get('/posts/:postId', authMiddleware, postController.getPostById);
router.put('/posts/:postId', authMiddleware, upload.single('image'), postController.updatePost);
router.delete('/posts/:postId', authMiddleware, postController.deletePost);
router.post('/posts/:postId/like', authMiddleware, postController.likePost);

// Dialog Routes
router.post('/dialogs', authMiddleware, dialogController.createDialog);
router.get('/dialogs', authMiddleware, dialogController.getDialogs);
router.get('/dialogs/:dialogId/messages', authMiddleware, dialogController.getMessagesByDialog);
router.delete('/dialogs/:dialogId', authMiddleware, dialogController.deleteDialog);

// Message Routes
router.post('/messages', authMiddleware, messageController.sendMessage);

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
