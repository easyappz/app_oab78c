import React from 'react';
import { Box, Typography } from '@mui/material';

const FeedPage = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Лента новостей
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Здесь будут отображаться посты ваших друзей и подписок.
      </Typography>
    </Box>
  );
};

export default FeedPage;
