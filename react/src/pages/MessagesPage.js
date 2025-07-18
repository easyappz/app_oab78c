import React from 'react';
import { Box, Typography } from '@mui/material';

const MessagesPage = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Сообщения
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Ваши переписки с друзьями появятся здесь.
      </Typography>
    </Box>
  );
};

export default MessagesPage;
