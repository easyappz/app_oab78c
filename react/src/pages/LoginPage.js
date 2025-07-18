import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useNotification } from '../contexts/NotificationContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleLogin = async () => {
    if (!email || !password) {
      showNotification('Введите email и пароль', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await login({ email, password });
      if (response.data && response.data.token) {
        // Токен уже сохраняется в api.js, но мы можем убедиться, что он сохранен
        const token = localStorage.getItem('token');
        if (!token) {
          localStorage.setItem('token', response.data.token);
        }
        showNotification('Успешный вход в систему', 'success');
        navigate('/feed');
      } else {
        showNotification('Ошибка входа: токен не получен', 'error');
      }
    } catch (err) {
      let errorMessage = 'Ошибка входа. Проверьте данные и попробуйте снова.';
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      showNotification(errorMessage, 'error');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 1, borderRadius: 2, backgroundColor: '#fff' }}>
      <Typography variant="h5" gutterBottom align="center">
        Вход
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        disabled={loading}
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        disabled={loading}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={24} /> : null}
      >
        {loading ? 'Вход...' : 'Войти'}
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Нет аккаунта? <Button variant="text" onClick={() => navigate('/register')} disabled={loading}>Зарегистрироваться</Button>
      </Typography>
    </Box>
  );
};

export default LoginPage;
