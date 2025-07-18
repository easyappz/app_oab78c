import React from 'react';
import { Typography, Box } from '@mui/material';

const ProfilePage = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Мой профиль
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Здесь будет информация о вашем профиле.
      </Typography>
    </Box>
  );
};

export default ProfilePage;
