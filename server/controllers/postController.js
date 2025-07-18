const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file ? req.file.path : null;
    const author = req.user.id;

    if (!content && !image) {
      return res.status(400).json({ message: 'Пост не может быть пустым' });
    }

    const newPost = new Post({
      content,
      image,
      author,
    });

    const savedPost = await newPost.save();
    await savedPost.populate('author', 'name email');
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Ошибка при создании поста' });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name email');
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Ошибка при получении постов' });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('author', 'name email');
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Ошибка при получении поста' });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file ? req.file.path : null;

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Нет прав для редактирования поста' });
    }

    post.content = content || post.content;
    if (image) post.image = image;
    const updatedPost = await post.save();
    await updatedPost.populate('author', 'name email');
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Ошибка при обновлении поста' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Нет прав для удаления поста' });
    }

    await post.remove();
    res.status(200).json({ message: 'Пост удален' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Ошибка при удалении поста' });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    const userId = req.user.id;
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    const updatedPost = await post.save();
    res.status(200).json({ likes: updatedPost.likes });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Ошибка при добавлении лайка' });
  }
};
