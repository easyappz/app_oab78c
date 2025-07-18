const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const author = req.user.id;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const newPost = new Post({
      content,
      author
    });

    const savedPost = await newPost.save();
    await savedPost.populate('author', 'username email');

    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

// Get all posts (feed for friends or public)
exports.getPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { filter } = req.query; // 'friends' or 'all'

    let query = {};
    if (filter === 'friends') {
      const user = await User.findById(userId).select('friends');
      const friendIds = user.friends.map(friend => friend._id);
      friendIds.push(userId); // Include user's own posts
      query = { author: { $in: friendIds } };
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .populate('author', 'username email')
      .populate('likes', 'username');

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// Get a specific post by ID
exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate('author', 'username email')
      .populate('likes', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error fetching post' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to update this post' });
    }

    post.content = content;
    const updatedPost = await post.save();
    await updatedPost.populate('author', 'username email');

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Error updating post' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this post' });
    }

    await Post.deleteOne({ _id: postId });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
};

// Like or unlike a post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const likeIndex = post.likes.indexOf(userId);
    let message = '';

    if (likeIndex === -1) {
      post.likes.push(userId);
      message = 'Post liked';
    } else {
      post.likes.splice(likeIndex, 1);
      message = 'Post unliked';
    }

    await post.save();
    await post.populate('likes', 'username');

    res.json({ message, likes: post.likes });
  } catch (error) {
    console.error('Error liking/unliking post:', error);
    res.status(500).json({ message: 'Error liking/unliking post' });
  }
};
