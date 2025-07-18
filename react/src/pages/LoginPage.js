import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Все поля должны быть заполнены');
      return;
    }

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/feed');
      }
    } catch (err) {
      console.error('Ошибка авторизации:', err);
      setError(err.response?.data?.message || 'Произошла ошибка при входе');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#EDEDED' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ color: '#4682B4', fontWeight: 'bold' }}>
          Вход ВКонтакте
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            <AlertTitle>Ошибка</AlertTitle>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email или телефон"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
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
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5, backgroundColor: '#4682B4', '&:hover': { backgroundColor: '#3A6D9B' } }}
          >
            Войти
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <a href="/register" style={{ color: '#4682B4', textDecoration: 'none' }}>Зарегистрироваться</a>
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 1 }}>
          <a href="#" style={{ color: '#4682B4', textDecoration: 'none' }}>Забыли пароль?</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
