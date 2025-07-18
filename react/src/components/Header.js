import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, TextField, IconButton, Avatar } from '@mui/material';
import { Search as SearchIcon, Notifications as NotificationsIcon } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white', fontWeight: 'bold' }}>
          ВКонтакте
        </Typography>
        <Box sx={{ flexGrow: 1, mx: 2 }}>
          <TextField 
            placeholder="Поиск" 
            variant="outlined" 
            size="small" 
            sx={{ backgroundColor: 'white', borderRadius: 1, width: '40%' }} 
            InputProps={{
              endAdornment: (
                <IconButton size="small">
                  <SearchIcon />
                </IconButton>
              )
            }}
          />
        </Box>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <Box sx={{ ml: 1 }}>
          <Avatar sx={{ width: 32, height: 32 }} component={Link} to="/profile" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
