import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';

const MessagesPage = () => {
  const conversations = [
    { name: 'Иван Иванов', lastMessage: 'Привет, как дела?', avatar: 'https://via.placeholder.com/40' },
    { name: 'Мария Петрова', lastMessage: 'Встретимся завтра?', avatar: 'https://via.placeholder.com/40' },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Сообщения
      </Typography>
      <Box className="card">
        <List>
          {conversations.map((conv, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={conv.avatar} />
                </ListItemAvatar>
                <ListItemText primary={conv.name} secondary={conv.lastMessage} />
              </ListItem>
              {index < conversations.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default MessagesPage;
