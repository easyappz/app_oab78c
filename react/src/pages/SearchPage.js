import React from 'react';
import { Typography, Box } from '@mui/material';

const SearchPage = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Поиск
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Здесь вы сможете искать друзей и сообщества.
      </Typography>
    </Box>
  );
};

export default SearchPage;
