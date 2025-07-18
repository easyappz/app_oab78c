import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password || !confirmPassword) {
      setError('Все поля должны быть заполнены');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', { username, email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/feed');
      }
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      setError(err.response?.data?.message || 'Произошла ошибка при регистрации');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#EDEDED' }}>
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ color: '#4682B4', fontWeight: 'bold' }}>
          Регистрация ВКонтакте
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            <AlertTitle>Ошибка</AlertTitle>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя пользователя"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            sx={{ backgroundColor: '#FFFFFF', borderRadius: 1 }}
          />
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
          <TextField
            label="Подтвердите пароль"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            Зарегистрироваться
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <a href="/login" style={{ color: '#4682B4', textDecoration: 'none' }}>Уже есть аккаунт? Войти</a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
