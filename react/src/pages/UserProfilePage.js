import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Button, 
  Divider, 
  CircularProgress, 
  Alert 
} from '@mui/material';
import { Message } from '@mui/icons-material';

const UserProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/user/profile/${userId}`);
        setUserData(response.data);
      } catch (err) {
        setError('Не удалось загрузить данные профиля. Попробуйте позже.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleSendMessage = async () => {
    try {
      await axios.post('/api/dialogs', { recipientId: userId });
      alert('Диалог создан. Перейдите в сообщения.');
    } catch (err) {
      console.error('Ошибка при создании диалога:', err);
      alert('Не удалось создать диалог. Попробуйте позже.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Alert severity="info">Данные пользователя не найдены.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, mb: 6 }}>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar 
            src={userData.avatar || '/default-avatar.png'} 
            alt={`${userData.firstName} ${userData.lastName}`} 
            sx={{ width: 200, height: 200, mb: 2, border: '2px solid #fff', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} 
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {userData.firstName} {userData.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {userData.status || 'Статус не указан'}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<Message />} 
              onClick={handleSendMessage}
              sx={{ backgroundColor: '#4682B4', '&:hover': { backgroundColor: '#3a6d9e' } }}
            >
              Написать сообщение
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#4682B4' }}>Основная информация</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <InfoItem label="Дата рождения" value={userData.birthday || 'Не указано'} />
            <InfoItem label="Город" value={userData.city || 'Не указано'} />
            <InfoItem label="Образование" value={userData.education || 'Не указано'} />
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box>
          <Typography variant="h6" sx={{ mb: 2, color: '#4682B4' }}>О себе</Typography>
          <Typography variant="body1" color="text.primary">
            {userData.about || 'Пользователь пока ничего о себе не рассказал.'}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

const InfoItem = ({ label, value }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

export default UserProfilePage;
