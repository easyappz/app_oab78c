import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import FeedIcon from '@mui/icons-material/Feed';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';

const NavigationMenu = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        component={Link}
        to="/"
        color="inherit"
        startIcon={<HomeIcon />}
        sx={{ color: '#fff' }}
      >
        Главная
      </Button>
      <Button
        component={Link}
        to="/profile"
        color="inherit"
        startIcon={<PersonIcon />}
        sx={{ color: '#fff' }}
      >
        Профиль
      </Button>
      <Button
        component={Link}
        to="/feed"
        color="inherit"
        startIcon={<FeedIcon />}
        sx={{ color: '#fff' }}
      >
        Лента
      </Button>
      <Button
        component={Link}
        to="/search"
        color="inherit"
        startIcon={<SearchIcon />}
        sx={{ color: '#fff' }}
      >
        Поиск
      </Button>
      <Button
        component={Link}
        to="/messages"
        color="inherit"
        startIcon={<MessageIcon />}
        sx={{ color: '#fff' }}
      >
        Сообщения
      </Button>
    </Box>
  );
};

export default NavigationMenu;
