import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const results = [
    { name: 'Иван Иванов', avatar: 'https://via.placeholder.com/40' },
    { name: 'Мария Петрова', avatar: 'https://via.placeholder.com/40' },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Поиск
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          placeholder="Введите имя или название"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button variant="contained" color="primary">
          Найти
        </Button>
      </Box>
      {searchTerm && (
        <Box className="card">
          <Typography variant="h6" gutterBottom>
            Результаты поиска
          </Typography>
          <List>
            {results.map((result, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar src={result.avatar} />
                </ListItemAvatar>
                <ListItemText primary={result.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;
