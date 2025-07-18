import React from 'react';
import { Box, Typography, Avatar, Divider, List, ListItem, ListItemText } from '@mui/material';

const ProfilePage = () => {
  const user = {
    name: 'Иван Иванов',
    status: 'Онлайн',
    avatar: 'https://via.placeholder.com/100',
    info: {
      city: 'Москва',
      birthday: '15 мая 1990',
      friends: 256,
    },
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar src={user.avatar} className="avatar" sx={{ mr: 2 }} />
        <Box>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2" color="textSecondary">{user.status}</Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6" gutterBottom>Информация</Typography>
      <List>
        <ListItem disablePadding sx={{ py: 1 }}>
          <ListItemText primary="Город" secondary={user.info.city} />
        </ListItem>
        <ListItem disablePadding sx={{ py: 1 }}>
          <ListItemText primary="День рождения" secondary={user.info.birthday} />
        </ListItem>
        <ListItem disablePadding sx={{ py: 1 }}>
          <ListItemText primary="Друзья" secondary={user.info.friends} />
        </ListItem>
      </List>
    </Box>
  );
};

export default ProfilePage;
