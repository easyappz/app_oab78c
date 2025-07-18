import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Заполните все поля');
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/feed');
      }
    } catch (err) {
      setError('Ошибка регистрации. Попробуйте снова.');
      console.error('Registration error:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, boxShadow: 1, borderRadius: 2, backgroundColor: '#fff' }}>
      <Typography variant="h5" gutterBottom align="center">
        Регистрация
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
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
        onClick={handleRegister}
        fullWidth
        sx={{ mt: 2 }}
      >
        Зарегистрироваться
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Уже есть аккаунт? <Button variant="text" onClick={() => navigate('/login')}>Войти</Button>
      </Typography>
    </Box>
  );
};

export default RegisterPage;
