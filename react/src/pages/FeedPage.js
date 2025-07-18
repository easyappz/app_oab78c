import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  CardActions, 
  Avatar, 
  IconButton, 
  Divider, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import { ThumbUp, Comment, Share } from '@mui/icons-material';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/posts');
        if (response.data && Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          setPosts([]);
        }
      } catch (err) {
        setError('Не удалось загрузить ленту. Попробуйте позже.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePostSubmit = async () => {
    if (!newPost && !image) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('content', newPost);
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data) {
        setPosts([response.data, ...posts]);
        setNewPost('');
        setImage(null);
      }
    } catch (err) {
      setError('Не удалось опубликовать пост. Попробуйте снова.');
      console.error('Error creating post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`/api/posts/${postId}/like`);
      if (response.data) {
        setPosts(posts.map(post => 
          post._id === postId ? { ...post, likes: response.data.likes } : post
        ));
      }
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  if (loading && posts.length === 0) {
    return (
      <Container maxWidth="md" sx={{ mt: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Загрузка ленты...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Лента новостей
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Create Post Section */}
      <Card sx={{ mb: 3, boxShadow: 1, borderRadius: 2 }}>
        <CardContent sx={{ pb: 0 }}>
          <TextField
            multiline
            rows={3}
            placeholder="Что у вас нового?"
            value={newPost}
            onChange={handlePostChange}
            variant="standard"
            fullWidth
            InputProps={{ disableUnderline: true }}
            sx={{ mb: 2 }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '16px' }}
          />
          {image && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Выбранное изображение: {image.name}
            </Typography>
          )}
        </CardContent>
        <CardActions sx={{ px: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostSubmit}
            disabled={loading || (!newPost && !image)}
          >
            Опубликовать
          </Button>
        </CardActions>
      </Card>

      {/* Posts List */}
      {posts.length === 0 && !loading ? (
        <Typography variant="body1" color="text.secondary" align="center">
          В ленте пока нет записей.
        </Typography>
      ) : (
        posts.map((post) => (
          <Card key={post._id} sx={{ mb: 2, boxShadow: 1, borderRadius: 2 }}>
            <CardHeader
              avatar={<Avatar>{post.author?.name?.charAt(0) || 'U'}</Avatar>}
              title={post.author?.name || 'Пользователь'}
              subheader={format(new Date(post.createdAt), 'd MMMM yyyy в HH:mm', { locale: ruLocale })}
            />
            <CardContent sx={{ py: 0 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {post.content}
              </Typography>
              {post.image && (
                <Box
                  component="img"
                  src={post.image}
                  alt="Пост"
                  sx={{ 
                    width: '100%', 
                    maxHeight: 400, 
                    objectFit: 'cover', 
                    borderRadius: 1, 
                    mb: 2 
                  }}
                />
              )}
            </CardContent>
            <CardActions disableSpacing>
              <IconButton 
                aria-label="Нравится" 
                onClick={() => handleLike(post._id)}
                sx={{ mr: 1 }}
              >
                <ThumbUp fontSize="small" />
                <Typography variant="body2" sx={{ ml: 0.5 }}>
                  {post.likes?.length || 0}
                </Typography>
              </IconButton>
              <IconButton aria-label="Комментировать" sx={{ mr: 1 }}>
                <Comment fontSize="small" />
              </IconButton>
              <IconButton aria-label="Поделиться">
                <Share fontSize="small" />
              </IconButton>
            </CardActions>
            <Divider />
          </Card>
        ))
      )}
    </Container>
  );
};

export default FeedPage;
