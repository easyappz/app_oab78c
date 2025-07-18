const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const userId = req.userId;
    const { content, images } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const newPost = new Post({
      author: userId,
      content,
      images: images || [],
    });

    await newPost.save();
    await newPost.populate('author', '-password');

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

const getPosts = async (req, res) => {
  try {
    const userId = req.userId;
    const posts = await Post.find({ author: userId })
      .populate('author', '-password')
      .populate('comments')
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

const likePost = async (req, res) => {
  try {
    const userId = req.userId;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    post.likes.push(userId);
    await post.save();

    res.json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Failed to like post' });
  }
};

module.exports = { createPost, getPosts, likePost };
