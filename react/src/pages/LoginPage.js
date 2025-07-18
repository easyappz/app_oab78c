import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет логика авторизации через API
    console.log({ email, password });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom align="center">
          Вход ВКонтакте
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email или телефон"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Войти
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <a href="/register" className="nav-link">Зарегистрироваться</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
