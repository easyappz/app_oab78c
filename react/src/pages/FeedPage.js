import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import PostCard from '../components/PostCard';

const FeedPage = () => {
  const posts = [
    {
      author: 'Иван Иванов',
      avatar: 'https://via.placeholder.com/40',
      date: '5 минут назад',
      content: 'Сегодня отличный день для прогулки!',
    },
    {
      author: 'Мария Петрова',
      avatar: 'https://via.placeholder.com/40',
      date: '1 час назад',
      content: 'Наконец-то закончила проект, можно отдохнуть.',
    },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Лента новостей
      </Typography>
      <Box className="card" sx={{ mb: 2 }}>
        <TextField
          placeholder="Что у вас нового?"
          variant="standard"
          fullWidth
          multiline
          rows={3}
          InputProps={{ disableUnderline: true }}
        />
        <Button variant="contained" color="primary" sx={{ mt: 1 }}>
          Опубликовать
        </Button>
      </Box>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </Box>
  );
};

export default FeedPage;
