import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Добро пожаловать в VK Clone
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Социальная сеть для общения и обмена новостями.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/feed')}
        sx={{ mr: 2 }}
      >
        Перейти к ленте
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate('/login')}
      >
        Войти
      </Button>
    </Box>
  );
};

export default HomePage;
