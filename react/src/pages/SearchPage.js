import React from 'react';
import { Box, Typography } from '@mui/material';

const SearchPage = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Поиск
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Ищите друзей, группы и интересные страницы.
      </Typography>
    </Box>
  );
};

export default SearchPage;
