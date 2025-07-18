import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useNotification } from '../contexts/NotificationContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Введите email и пароль');
      return;
    }

    try {
      const response = await login({ email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        showNotification('Успешный вход в систему', 'success');
        navigate('/feed');
      }
    } catch (err) {
      setError('Ошибка входа. Проверьте данные и попробуйте снова.');
      console.error('Login error:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 1, borderRadius: 2, backgroundColor: '#fff' }}>
      <Typography variant="h5" gutterBottom align="center">
        Вход
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
        sx={{ mt: 2 }}
      >
        Войти
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Нет аккаунта? <Button variant="text" onClick={() => navigate('/register')}>Зарегистрироваться</Button>
      </Typography>
    </Box>
  );
};

export default LoginPage;
