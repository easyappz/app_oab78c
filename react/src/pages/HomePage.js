import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Добро пожаловать в СоцСеть!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px' }}>
        Общайтесь с друзьями, делитесь моментами своей жизни и находите новых знакомых.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/login')}
        >
          Войти
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => navigate('/register')}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
