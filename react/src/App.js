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
import { useNotification } from './contexts/NotificationContext';
import './App.css';

function App() {
  // Исправляем проблему с деструктуризацией, перемещая использование хука внутрь компонента,
  // но после определения контекста. Однако, поскольку NotificationProvider уже обернут вокруг всего приложения,
  // хук useNotification будет работать корректно только для компонентов внутри провайдера.
  // В данном случае, из-за двойного использования NotificationProvider, возникает конфликт.
  // Удаляем лишний провайдер из App.js, так как он уже может быть в index.js или должен быть там.

  const { notification, closeNotification, showNotification } = useNotification();

  useEffect(() => {
    const handleSessionExpired = (event) => {
      showNotification(event.detail.message, 'error');
    };

    const handleApiError = (event) => {
      showNotification(event.detail.message, 'error');
    };

    window.addEventListener('sessionExpired', handleSessionExpired);
    window.addEventListener('apiError', handleApiError);
    return () => {
      window.removeEventListener('sessionExpired', handleSessionExpired);
      window.removeEventListener('apiError', handleApiError);
    };
  }, [showNotification]);

  return (
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
  );
}

export default App;
