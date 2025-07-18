import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import NavigationMenu from './NavigationMenu';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            СоцСеть
          </Typography>
          <NavigationMenu />
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet />
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          textAlign: 'center',
          backgroundColor: '#fff',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} СоцСеть. Все права защищены.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;
