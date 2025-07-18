import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import FeedPage from './pages/FeedPage';
import SearchPage from './pages/SearchPage';
import MessagesPage from './pages/MessagesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorBoundary from './ErrorBoundary';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4682B4',
    },
    secondary: {
      main: '#EDEDED',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
      },
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/:userId" element={<ProfilePage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
