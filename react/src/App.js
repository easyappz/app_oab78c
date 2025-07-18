import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationSnackbar from './components/NotificationSnackbar';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import FeedPage from './pages/FeedPage';
import SearchPage from './pages/SearchPage';
import MessagesPage from './pages/MessagesPage';
import DialogPage from './pages/DialogPage';
import DialogsPage from './pages/DialogsPage';
import UserProfilePage from './pages/UserProfilePage';
import './App.css';

function App() {
  const { notification, closeNotification, showNotification } = useNotification();

  useEffect(() => {
    const handleSessionExpired = (event) => {
      showNotification(event.detail.message, 'error');
    };

    window.addEventListener('sessionExpired', handleSessionExpired);
    return () => {
      window.removeEventListener('sessionExpired', handleSessionExpired);
    };
  }, [showNotification]);

  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/feed" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/feed"
              element={
                <ProtectedRoute>
                  <FeedPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dialogs"
              element={
                <ProtectedRoute>
                  <DialogsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dialog/:id"
              element={
                <ProtectedRoute>
                  <DialogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:id"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
      <NotificationSnackbar
        open={notification.open}
        onClose={closeNotification}
        message={notification.message}
        severity={notification.severity}
      />
    </NotificationProvider>
  );
}

function useNotification() {
  const context = React.useContext(NotificationContext);
  if (!context) {
    return {
      notification: { open: false, message: '', severity: 'info' },
      showNotification: () => {},
      closeNotification: () => {}
    };
  }
  return context;
}

const NotificationContext = React.createContext(null);

export default App;
