import React from 'react';
import { Typography, Box } from '@mui/material';

const MessagesPage = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Сообщения
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Здесь будут отображаться ваши диалоги.
      </Typography>
    </Box>
  );
};

export default MessagesPage;
