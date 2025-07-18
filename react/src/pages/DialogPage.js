import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, TextField, IconButton, Typography, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, CircularProgress } from '@mui/material';
import { Send as SendIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import axios from 'axios';

const DialogPage = () => {
  const { dialogId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [dialog, setDialog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchDialogAndMessages = async () => {
      try {
        const dialogResponse = await axios.get(`/api/dialogs/${dialogId}/messages`);
        setDialog(dialogResponse.data.dialog);
        setMessages(dialogResponse.data.messages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dialog and messages:', error);
        setLoading(false);
      }
    };

    fetchDialogAndMessages();
  }, [dialogId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await axios.post('/api/messages', {
        dialogId,
        content: newMessage,
      });
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleBack = () => {
    navigate('/messages');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
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
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1, height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">
          {dialog?.participants[1]?.name || 'Пользователь'}
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
        {messages.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
            Нет сообщений. Начните диалог!
          </Typography>
        ) : (
          <List>
            {messages.map(message => (
              <ListItem key={message._id} sx={{ flexDirection: message.isOwn ? 'row-reverse' : 'row' }}>
                <ListItemAvatar>
                  <Avatar src={message.sender.avatar || ''} alt={message.sender.name || 'Пользователь'} />
                </ListItemAvatar>
                <ListItemText 
                  primary={message.content} 
                  secondary={new Date(message.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} 
                  sx={{ backgroundColor: message.isOwn ? '#e3f2fd' : '#f5f5f5', padding: 1, borderRadius: 2, maxWidth: '70%' }} 
                />
              </ListItem>
            ))}
          </List>
        )}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField 
          fullWidth 
          variant="outlined" 
          placeholder="Напишите сообщение..." 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          onKeyPress={handleKeyPress}
          sx={{ mr: 1 }} 
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DialogPage;
