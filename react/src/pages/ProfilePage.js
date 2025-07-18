import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  Container, 
  Typography, 
  Avatar, 
  Button, 
  TextField, 
  Divider, 
  CircularProgress, 
  Alert, 
  Snackbar 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    description: '',
    avatar: '',
    city: '',
    birthday: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/user/profile');
        if (response.data) {
          setProfileData(response.data);
        }
      } catch (err) {
        setError('Не удалось загрузить данные профиля.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await axios.put('/api/user/profile', profileData);
      setSuccessMessage('Профиль успешно обновлен!');
      setIsEditing(false);
    } catch (err) {
      setError('Не удалось обновить профиль.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage(null);
    setError(null);
  };

  if (loading && !isEditing) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1">Загрузка профиля...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
      {successMessage && (
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          p: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 3,
          }}
        >
          <Avatar
            src={profileData.avatar || 'https://via.placeholder.com/150'}
            alt={`${profileData.firstName} ${profileData.lastName}`}
            sx={{ width: 150, height: 150, border: '2px solid #fff', boxShadow: 1 }}
          />
          <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h5" gutterBottom>
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profileData.city || 'Город не указан'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              День рождения: {profileData.birthday || 'Не указан'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
              onClick={isEditing ? handleSaveChanges : handleEditToggle}
              sx={{ mt: 2, width: { xs: '100%', sm: 'auto' } }}
              disabled={loading}
            >
              {isEditing ? 'Сохранить' : 'Редактировать профиль'}
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            О себе
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={4}
              name="description"
              value={profileData.description}
              onChange={handleInputChange}
              placeholder="Расскажите о себе"
              variant="outlined"
            />
          ) : (
            <Typography variant="body1" color={profileData.description ? 'text.primary' : 'text.secondary'}>
              {profileData.description || 'Информация не указана'}
            </Typography>
          )}
        </Box>

        {isEditing && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Имя"
              name="firstName"
              value={profileData.firstName}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Фамилия"
              name="lastName"
              value={profileData.lastName}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Город"
              name="city"
              value={profileData.city}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Дата рождения"
              name="birthday"
              value={profileData.birthday}
              onChange={handleInputChange}
              variant="outlined"
              placeholder="ДД.ММ.ГГГГ"
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
