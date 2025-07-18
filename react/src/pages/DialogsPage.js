import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, ListItemAvatar, ListItemSecondaryAction, Avatar, IconButton, Typography, Divider, CircularProgress } from '@mui/material';
import { Delete as DeleteIcon, Message as MessageIcon } from '@mui/icons-material';
import axios from 'axios';

const DialogsPage = () => {
  const [dialogs, setDialogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDialogs = async () => {
      try {
        const response = await axios.get('/api/dialogs');
        setDialogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dialogs:', error);
        setLoading(false);
      }
    };

    fetchDialogs();
  }, []);

  const handleDialogClick = (dialogId) => {
    navigate(`/messages/${dialogId}`);
  };

  const handleDeleteDialog = async (dialogId) => {
    try {
      await axios.delete(`/api/dialogs/${dialogId}`);
      setDialogs(dialogs.filter(dialog => dialog._id !== dialogId));
    } catch (error) {
      console.error('Error deleting dialog:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Сообщения
      </Typography>
      <Divider sx={{ my: 1 }} />
      {dialogs.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center">
          У вас пока нет диалогов. Начните общение с друзьями!
        </Typography>
      ) : (
        <List>
          {dialogs.map(dialog => (
            <ListItem 
              key={dialog._id} 
              onClick={() => handleDialogClick(dialog._id)} 
              sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f5f5f5' } }}
            >
              <ListItemAvatar>
                <Avatar src={dialog.participants[1]?.avatar || ''} alt={dialog.participants[1]?.name || 'Пользователь'} />
              </ListItemAvatar>
              <ListItemText 
                primary={dialog.participants[1]?.name || 'Пользователь'} 
                secondary={dialog.lastMessage?.content || 'Нет сообщений'} 
              />
              <ListItemSecondaryAction>
                <IconButton 
                  edge="end" 
                  aria-label="delete" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteDialog(dialog._id);
                  }}
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default DialogsPage;
