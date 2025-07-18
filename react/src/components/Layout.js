import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Container, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, useTheme } from '@mui/material';
import { Home, Person, DynamicFeed, Search, Message } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Layout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Главная', icon: <Home />, path: '/' },
    { text: 'Мой профиль', icon: <Person />, path: '/profile' },
    { text: 'Лента новостей', icon: <DynamicFeed />, path: '/feed' },
    { text: 'Поиск', icon: <Search />, path: '/search' },
    { text: 'Сообщения', icon: <Message />, path: '/messages' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <Box sx={{ display: 'flex' }}>
      {!isAuthPage && (
        <>
          <AppBar 
            position="fixed" 
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#fff', color: '#4682B4' }} 
          >
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                VK Clone
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#fff' },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
              <List>
                {menuItems.map((item) => (
                  <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      selected={location.pathname === item.path}
                      onClick={() => handleNavigation(item.path)}
                      sx={{
                        minHeight: 48,
                        justifyContent: 'initial',
                        px: 2.5,
                        '&.Mui-selected': {
                          backgroundColor: theme.palette.secondary.main,
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: 3,
                          justifyContent: 'center',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Box>
          </Drawer>
        </>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', mt: isAuthPage ? 0 : 8 }}>
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
