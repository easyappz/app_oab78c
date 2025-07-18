import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { Person as PersonIcon, Feed as FeedIcon, Search as SearchIcon, Message as MessageIcon } from '@mui/icons-material';

const Sidebar = () => {
  const menuItems = [
    { text: 'Моя страница', icon: <PersonIcon />, path: '/profile' },
    { text: 'Новости', icon: <FeedIcon />, path: '/feed' },
    { text: 'Поиск', icon: <SearchIcon />, path: '/search' },
    { text: 'Сообщения', icon: <MessageIcon />, path: '/messages' },
  ];

  return (
    <div className="sidebar">
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} component={Link} to={item.path} sx={{ padding: '8px 16px' }}>
            <ListItemIcon sx={{ color: '#2A5885' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: '#2A5885' }} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
