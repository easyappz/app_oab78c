import React from 'react';
import { Typography, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Добро пожаловать ВКонтакте
      </Typography>
      <Typography variant="body1">
        Это главная страница социальной сети. Используйте навигацию слева для перехода к разделам.
      </Typography>
    </Box>
  );
};

export default HomePage;
