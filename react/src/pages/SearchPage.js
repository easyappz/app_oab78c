import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  TextField, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  ListItemSecondaryAction, 
  Avatar, 
  IconButton, 
  Divider, 
  CircularProgress, 
  Container, 
  Paper 
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/user/search', {
        params: { query: searchQuery },
      });
      setSearchResults(response.data.users || []);
    } catch (err) {
      setError('Ошибка при поиске пользователей. Попробуйте еще раз.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleAddFriend = async (userId) => {
    try {
      await axios.post('/api/user/friend', { friendId: userId });
      setSearchResults((prev) => 
        prev.map((user) => 
          user._id === userId ? { ...user, isFriend: true } : user
        )
      );
    } catch (err) {
      console.error('Add friend error:', err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3, mb: 3 }}>
      <Paper elevation={1} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SearchIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
            Поиск людей
          </Typography>
        </Box>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Введите имя или фамилию"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.disabled', mr: 1 }} />,
          }}
          sx={{ mb: 2 }}
        />
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && !loading && (
        <Typography color="error" align="center" sx={{ my: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && searchResults.length === 0 && searchQuery.trim() && (
        <Typography align="center" sx={{ my: 2, color: 'text.secondary' }}>
          По вашему запросу ничего не найдено
        </Typography>
      )}

      {!loading && !error && searchResults.length > 0 && (
        <Paper elevation={1} sx={{ borderRadius: 2 }}>
          <List>
            {searchResults.map((user, index) => (
              <React.Fragment key={user._id}>
                <ListItem 
                  alignItems="flex-start" 
                  sx={{ cursor: 'pointer' }} 
                  onClick={() => handleUserClick(user._id)}
                >
                  <ListItemAvatar>
                    <Avatar 
                      alt={`${user.firstName} ${user.lastName}`} 
                      src={user.avatar ? `/uploads/${user.avatar}` : undefined} 
                      sx={{ width: 50, height: 50, mr: 2 }} 
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.firstName} ${user.lastName}`}
                    secondary={user.status || 'Нет статуса'}
                    primaryTypographyProps={{ fontWeight: '500' }}
                  />
                  <ListItemSecondaryAction>
                    {!user.isFriend && (
                      <IconButton
                        edge="end"
                        aria-label="add friend"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddFriend(user._id);
                        }}
                        size="small"
                        sx={{ ml: 1 }}
                      >
                        <PersonAddIcon fontSize="small" color="primary" />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
                {index < searchResults.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Container>
  );
};

export default SearchPage;
