import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import '../App.css';

const Layout = () => {
  return (
    <Box className="app">
      <Header />
      <Box className="page-content">
        <Container className="container">
          <Box className="two-column-layout">
            <Sidebar />
            <Box className="main-content">
              <Outlet />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
